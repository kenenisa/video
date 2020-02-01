import React, { useState, useEffect } from "react";
import "./App.css";
//components
import Control from "./Control";
import Call from "./Call/Call";
import Coming from "./Offer/Coming/Coming";
import Going from "./Offer/Going/Going";
import Pages from "./Pages/Pages";
import Home from "./Home/Home";
import Stream from './Stream/Stream';
import Live from './Stream/Live/Live';
import Watch from './Stream/Watch/Watch';
//tools
import { Wrapper, Route } from "./Router/Koute";
import swarmFunc from "./func/swarm";
import {
    firstPhase,
    secondPhase,
    phaseOneRequest,
    getStorage,
    sendPeer,
    validatePeer,
    streamExists
} from "./func/serviceProvider";
import profileContext from "./../Context/profileContext";
import Responder from "./func/Responder";
import Toast from "./Toast/Toast";
import toastContext from "../Context/toastContext";
//
export default function App() {
    // const conn = true;
    const [stream, setStream] = useState(null);
    const [swarm, setSwarm] = useState(null);
    const [state, setState] = useState({ type: null, data: null });
    const [pro, setPro] = useState({
        name: "",
        photo: ""
    });
    const [comingPro, changeComingPro] = useState({
        name: "",
        photo: ""
    });
    const [toast, changeToast] = useState({ text: "", type: "" });
    const [fakeRoute, changeFakeRoute] = useState("");
    const [msg, setMsg] = useState([]);
    const [otherFilter, setOtherFilter] = useState(false);
    const [count, setCount] = useState(0);
    const [otherPause, setOtherPause] = useState(false);
    const [otherMute, setOtherMute] = useState(false);
    const [streams, setStreams] = useState([]);
    const [flag, setFlag] = useState(0);
    const [watchStream, setWatchStream] = useState(null);
    const createToast = (text, type) => {
        changeToast({ text, type });
    };
    const thirdPhase = (data) => {
        if (data.type === "text") {
            let value = msg;
            value.push(data.data);
            setMsg(value);
            setCount(msg.length);
        } else if (data.type === "filter") {
            setOtherFilter(data.data);
        } else if (data.type === 'pause') {
            setOtherPause(data.data);
        } else if (data.type === 'mute') {
            setOtherMute(data.data)
        } else {
            console.log('phase 3 data type is not correct')
        }
    }
    useEffect(() => {
        if (state.type === "ring") {
            changeComingPro(state.data.who.pro);
        }
    }, [state]);
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true
            })
            .then(str => {
                setStream(str);
            }).catch(err=>console.log(err));
    }, []);
    useEffect(() => {
        if (stream) {
            setSwarm(swarmFunc(stream));
        }
    }, [stream]);

    useEffect(() => {
        if (navigator.onLine) {
            if (swarm) {
                swarm.on("connect", (peer, id) => {
                    console.log("peer connected", id);
                    peer.on("data", data => {
                        data = JSON.parse(data.toString());
                        console.log(data)
                        if (data.phase === 1) {
                            firstPhase(swarm, data);
                        } else if (data.phase === 2) {
                            setState(secondPhase(swarm, data));
                        } else if (data.phase === 3) {
                            thirdPhase(data);
                        } else if (data.phase === 4) {
                            console.log(data)
                            if (!streamExists(streams, data)) {   
                                let array = streams;
                                array.push(data);
                                setStreams(array);
                                setFlag(streams.length);
                            }
                        }else{
                            console.log("phase is not correct");
                        }
                    });
                    if (peer.stream) {
                        peer.stream.getTracks()[0].enabled = false;

                        const other = document.createElement("audio");
                        other.srcObject = peer.stream;
                        other.play();
                        document.body.appendChild(other);
                    }
                });
                phaseOneRequest(swarm);

                setInterval(() => {
                    console.log("[peers]: ", swarm.peers.length);
                    phaseOneRequest(swarm);
                }, 3000);
            }
            console.log(swarm);
        } else {
            console.error("YOU ARE OFFLINE");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swarm]);
    const delayFake = () => {
        changeFakeRoute("");
    };
    const call = id => {
        const peer = sendPeer(id, swarm, {
            type: "offer",
            who: { your: id, me: swarm.me, pro: getStorage().me },
            phase: 2
        });
        //
        if (peer) {
            changeFakeRoute("going");
            setTimeout(delayFake, 2000);
            console.log("Calling to: ", peer);
        } else {
            createToast("User is not Online right now", "w");
        }
    };
    const answer = id => {
        const peer = swarm.remotes[id];
        const isPeer = sendPeer(id, swarm, {
            type: "answer",
            who: swarm.me,
            phase: 2
        });
        if (isPeer) {
            peer.stream.getTracks()[0].enabled = true;
        } else {
            createToast(
                "There is a netWork defficulty now, can't Answer!",
                "r"
            );
        }
    };
    const reject = id => {
        sendPeer(id, swarm, {
            type: "rejected",
            who: swarm.me,
            phase: 2
        });
    };
    const abort = id => {
        sendPeer(id, swarm, {
            type: "abort",
            who: swarm.me,
            phase: 2
        });
    };
    const callAccepted = id => {
        sendPeer(id, swarm, {
            type: "accepted",
            who: swarm.me,
            phase: 2
        });
    };
    const endCall = id => {
        sendPeer(id, swarm, {
            type: "end",
            who: swarm.me,
            phase: 2
        });
    }
    const sendText = (id, text) => {
        if (text !== '') {
            const isSent = sendPeer(id, swarm, { type: "text", data: {name:getStorage().me.name,msg:text}, phase: 3 });
            if (!isSent) {
                createToast('Unable to send text, Try Again!', 'r')
                return false;
            } 
        }
        return true;
    };
    const sendFilter = (id, value) => {
        const isSent = sendPeer(id, swarm, {
            type: "filter",
            data: value,
            phase: 3
        });
        if (!isSent) {
            createToast("Unable to set Filter, Try Again!", "r");
            return false;
        }
        return true;
    }
    const sendPause = (id,value) => {
        const isSent = sendPeer(id, swarm, {
            type: "pause",
            data: value,
            phase: 3
        });
        if (!isSent) {
            createToast("Unable to Pause, Try Again!", "r");
            return false;
        }
        return true;
    }
    const sendMute = (id, value) => {
        const isSent = sendPeer(id, swarm, {
            type: "mute",
            data: value,
            phase: 3
        });
        if (!isSent) {
            createToast("Unable to Mute, Try Again!", "r");
            return false;
        }
        return true;
    };
    const sendStream = (value) => {
        // eslint-disable-next-line array-callback-return
        swarm.peers.map(peer => {
            validatePeer(peer, { type: "stream", data: value, phase: 4 });
        })
    }
    return (
        <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
            <profileContext.Provider
                value={{
                    profile: pro,
                    changeProfile: setPro,
                    call,
                    comingPro,
                    changeComingPro,
                    answer,
                    reject
                }}>
                <toastContext.Provider value={{ toast, createToast }}>
                    <Toast />
                    <Wrapper base={getStorage().me.name ? "home" : "welcome"}>
                        <Responder state={state.type} fakeRoute={fakeRoute} />
                        <Route
                            path='watch'
                            component={() => (
                                <Watch
                                    watchStream={watchStream}
                                    swarm={swarm}
                                />
                            )}
                        />
                        <Route
                            path='live'
                            component={() => (
                                <Live stream={stream} sendStream={sendStream} />
                            )}
                        />
                        <Route
                            path='stream'
                            component={() => (
                                <Stream
                                    streams={streams}
                                    flag={flag}
                                    setWatchStream={setWatchStream}
                                />
                            )}
                        />
                        <Route
                            path='contacts'
                            component={() => (
                                <Control peers={swarm ? swarm.remotes : {}} />
                            )}
                        />
                        <Route path='profile' component={() => <Control />} />
                        <Route
                            path='call'
                            component={() => (
                                <Call
                                    sendText={sendText}
                                    msg={msg}
                                    setMsg={setMsg}
                                    otherFilter={otherFilter}
                                    sendFilter={sendFilter}
                                    count={count}
                                    sendPause={sendPause}
                                    otherPause={otherPause}
                                    stream={stream}
                                    swarm={swarm}
                                    sendMute={sendMute}
                                    otherMute={otherMute}
                                    endCall={endCall}
                                />
                            )}
                        />
                        <Route
                            path='coming'
                            component={() => (
                                <Coming
                                    reject={reject}
                                    callAccepted={callAccepted}
                                />
                            )}
                        />
                        <Route
                            path='going'
                            component={() => (
                                <Going
                                    state={state}
                                    abort={abort}
                                    setState={setState}
                                />
                            )}
                        />
                        <Route path='welcome' component={() => <Pages />} />
                        <Route path='login' component={() => <Pages />} />
                        <Route path='signup' component={() => <Pages />} />
                        <Route path='home' component={() => <Home />} />
                    </Wrapper>
                </toastContext.Provider>
            </profileContext.Provider>
        </div>
    );
    // return (
    //     <div>
    //         {conn ? (
    //             <Call />
    //         ) : (
    //             <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
    //                 <Control />
    //             </div>
    //         )}
    //     </div>
    // );
}

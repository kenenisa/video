import React, { useRef, useEffect, useState } from "react";
import serverMan from "../Request/serverMan";
import PeerObj from './Peer/PeerObj';

function App() {
    const element = useRef(null);
    const element2 = useRef(null);
    const [peerGuy, setPeerGuy] = useState(PeerObj());
    const getVideo = () => {
        // console.log( navigator.mediaDevices.getSupportedConstraints())
        console.log(JSON.stringify(navigator));
        fetch(`http://localhost:8000/api/nav?navigator=${navigator}`)
            .then(e => {
                document.getElementById("msg").innerHTML = e;
                console.log(e.body);
            })
            .catch(e => console.error(e));
        // navigator.webkitGetUserMedia({
        //         video: {
        //             minAspectRatio:2,
        //             minFrameRate: 60,
        //         },
        //         audio: false
        //     })
        //     .then(stream => {
        //         element.current.srcObject = stream;
        //         element.current.play();
        //         const peer = new Peer({
        //             initiator:
        //                 window.location.href === "http://localhost:3000/init",
        //             trickle: false,
        //             stream: stream
        //         });
        //         peer.on("signal", e => {
        //             document.getElementById("mySignal").value = JSON.stringify(
        //                 e
        //             );
        //         });
        //         document
        //             .querySelector("form")
        //             .addEventListener("submit", ev => {
        //                 ev.preventDefault();
        //                 peer.signal(
        //                     JSON.parse(
        //                         document.querySelector("#incoming").value
        //                     )
        //                 );
        //             });
        //         peer.on("connect", () => {
        //             console.log("CONNECT");
        //             document
        //                 .getElementById("send")
        //                 .addEventListener("click", () => {
        //                     peer.send(document.getElementById("myMsg").value);
        //                 });
        //         });

        //         peer.on("data", data => {
        //             document.getElementById("msg").innerHTML += data + "</br>";
        //         });
        //         peer.on("stream", str => {
        //             element2.current.srcObject = str;
        //             element2.current.play();
        //         });
        //         console.log(peer);
        //     })
        //     .catch(err => console.err(err));
    };
    function lookForIncoming() {
        const num = document.getElementById("myNumber").value;
            
            if (!peerGuy.intiator) {
                serverMan("incoming",{id:num})
                .then(e => {
                    if (e.res) {
                    
                    document.getElementById("incoming").innerHTML = 'InComing Call...';
                    peerGuy.signal(JSON.parse(e).address);
                    document
                    .getElementById("answer")
                        .addEventListener("click", function () {
                            serverMan('answer', { id: JSON.parse(e).id,address:localStorage.peerAdress }).then(res => {
                                if (res) {
                                    document.getElementById("incoming")
                                    .innerHTML = 'CONNETED';
                                }
                            })
                        });
                } else {
                    setTimeout(lookForIncoming, 3000);
                }
            })
            .catch(err => {
                console.log("THERE IS A FUCKING ERROR: ", err);
            });
            }
    }
    useEffect(() => {
        if (!peerGuy.intiator) {
            lookForIncoming();
        }
    }, []);
    // function initPeer(init, stream) {
    //     const peer = new Peer({
    //         initiator: init,
    //         trickle: false,
    //         stream: stream
    //     });
    //     return peer;
    // }
    function waitForAnswer() {
        serverMan('waiting', { id: window.id }).then(e => {
            if (e.res) {
                console.log('Answer Found');
            } else {
                console.log('trying agin for waiting...');
                setTimeout(waitForAnswer, 3000);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    function sendAdress(peerGuy) {
        const id = document.getElementById("id").innerHTML;
        window.id = id;
        console.log('send function was called...')
        if (peerGuy) {
            console.log("peer guy exists...");
            console.log(localStorage.peerAdress)
            if (localStorage.peerAdress) {
                serverMan("call", { address: localStorage.peerAdress, id })
                    .then(res => {
                        console.log("response", res);
                        if (res) {
                            console.warn("everything was a sucess");
                            document.getElementById("msg").innerHTML =
                                "Waiting for an Answer";
                            waitForAnswer();
                        }
                    })
                    .catch(err => {
                        console.log(
                            "ERRORR: while making a requset for a call..."
                        );
                    });
            } else {
                console.log("REtrying to request....");
            }
        } else {
            console.log("REtrying to request....");
        }
    }
    // function addMedia(stream) {
    //     peerGuy.addStream(stream); // <- add streams to peer dynamically
    // }
    function Call() {
        navigator.mediaDevices
            .getUserMedia({ video: false, audio: true })
            .then(stream => {
                peerGuy.intiator = true;
                peerGuy.addStream(stream);
                console.log(peerGuy);
                console.log("got a stream");
                sendAdress(peerGuy);
            })
            .catch(err => {
                console.error("Stream ERROR:", err);
            });
    }
    return (
        <div className='App'>
            <h2>Call</h2>
            <form>
                <input type='text' id='id' />
                <input type='button' id='call' value='Call' onClick={Call} />
            </form>
            Status: 
            <div id="msg">

            </div>
            <h2>Answer</h2>
            
            <h3 id='incoming'></h3>
            <input type="text" id="myNumber"/>
            <input type='button' value='Answer' id='answer' />
            <h1>MY Video</h1>
            <video
                style={{ background: "red" }}
                ref={element}
                controlls='true'
                autoPlay
                className='video'>
                You have a fucked Up browser!
            </video>
            <video
                style={{ border: "3px solid blue" }}
                ref={element2}
                controlls='true'
                autoPlay
                className='video'>
                You have a fucked Up browser!
            </video>
        </div>
    );
}

export default App;

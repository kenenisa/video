import React, { useState, useRef, useContext, useEffect } from "react";
import "./Call.css";
//
import { width } from "./../func/func";
import profileContext from "../../Context/profileContext";
import { getStorage } from "../func/serviceProvider";
import Msg from "./Msg";
import { Router } from "../Router/Koute";
// import { Router } from "../Router/Koute";
//
function Call({
    sendText,
    msg,
    setMsg,
    otherFilter,
    sendFilter,
    count,
    sendPause,
    otherPause,
    stream,
    swarm,
    sendMute,
    otherMute,
    endCall
}) {
    const { changeRoute } = useContext(Router);
    const { comingPro, profile } = useContext(profileContext);
    const [buttons, setButtons] = useState(false);
    const [textField, setTextField] = useState(false);
    const [filter, setFilter] = useState(false);
    const [filterOption, setFilterOption] = useState(false);
    const [quality, setQuality] = useState(false);
    const [pause, setPause] = useState(false);
    const [qualityMsg, setQualityMsg] = useState(false);
    const [flash, setFlash] = useState(false);
    const [mute, setMute] = useState(false);
    const [textValue, setTextValue] = useState("");
    const inputElm = useRef(null);
    const video = useRef(null);
    const otherVideo = useRef(null);

    const startWriting = () => {
        setTextField(!textField);
        inputElm.current.focus();
    };
    const setFilterFunc = value => {
        const isSent = sendFilter(
            comingPro.id ? comingPro.id : profile.id,
            value
        );
        if (isSent) {
            setFilter(value);
        }
        setFilterOption(false);
    };
    const setQualityFunc = () => {
        setQuality(!quality);
        if (!quality) {
            setQualityMsg(true);
            setTimeout(dismissQualityMsg, 3000);
        }
    };
    const dismissQualityMsg = () => {
        setQualityMsg(false);
    };
    const screenShot = () => {
        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext("2d");
        context.drawImage(
            otherVideo.current,
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );
        const imgUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = imgUrl;
        a.download = comingPro.id ? comingPro.name : profile.name;
        a.click();
    };
    const flashScreen = () => {
        setFlash(true);
        setTimeout(dismissFlash, 500);
        function dismissFlash() {
            setFlash(false);
        }
        screenShot();
    };
    const send = e => {
        if (e.nativeEvent.key === "Enter") {
            //send it over
            const isSent = sendText(
                comingPro.id ? comingPro.id : profile.id,
                textValue
            );
            if (isSent) {
                // show to myself
                let value = msg;
                value.push({ msg: textValue, name: getStorage().me.name });
                setMsg(value);
            }
            setTextField(false);
            setTextValue("");
        }
    };
    const makePause = () => {
        if (sendPause(comingPro.id ? comingPro.id : profile.id, !pause)) {
            setPause(!pause);
            if (video) {
                if (!pause) {
                    video.current.pause();
                } else {
                    video.current.play();
                }
            }
        }
    };
    const makeMute = () => {
        if (sendMute(comingPro.id ? comingPro.id : profile.id, !mute)) {
            setMute(!mute);
        }
    };
    useEffect(() => {
        if (otherVideo) {
            if (otherPause) {
                otherVideo.current.pause();
            } else {
                otherVideo.current.play();
            }
        }
    }, [otherPause]);
    useEffect(() => {
        if (otherVideo) {
            if (otherMute) {
                otherVideo.current.muted = true;
            } else {
                otherVideo.current.muted = false;
            }
        }
    }, [otherMute]);
    useEffect(() => {
        if (video) {
            video.current.srcObject = stream;
            video.current.muted = true;
            video.current.play();
        }
        if (otherVideo) {
            otherVideo.current.srcObject =
                swarm.remotes[comingPro.id ? comingPro.id : profile.id].stream;
            otherVideo.current.play();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stream, swarm]);
    return (
        <div className='call'>
            <div className={`flash ${flash ? "show" : ""}`}></div>
            <div className='top'>
                <div
                    className={`circle text ${textField ? "active" : ""}`}
                    onClick={startWriting}>
                    <i className='material-icons'>textsms</i>
                    <div className={`input ${textField ? "" : "hide"}`}>
                        <input
                            type='text'
                            placeholder='Text Message ... '
                            ref={inputElm}
                            onChange={e => {
                                setTextValue(e.target.value);
                            }}
                            onKeyPress={send}
                            value={textValue}
                        />
                    </div>
                </div>
                <div
                    className={`filter circle ${filter ? "active" : ""}`}
                    onClick={() => setFilterOption(!filterOption)}>
                    <i className='material-icons'>photo_filter</i>
                    <div className={`options ${filterOption ? "" : "hide"}`}>
                        {filter ? (
                            <div onClick={() => setFilterFunc(false)}>
                                {" "}
                                None
                            </div>
                        ) : (
                            ""
                        )}
                        <div onClick={() => setFilterFunc("sepia")}> Sepia</div>
                        <div onClick={() => setFilterFunc("bnw")}>
                            {" "}
                            Black and white
                        </div>
                        <div onClick={() => setFilterFunc("inverted")}>
                            {" "}
                            Inverted
                        </div>
                        <div onClick={() => setFilterFunc("contrast")}>
                            {" "}
                            Contrast
                        </div>
                    </div>
                </div>
                <div
                    className={`hd circle ${quality ? "active" : ""}`}
                    onClick={() => setQualityFunc()}>
                    <i className='material-icons'>high_quality</i>
                    <div className={`msg ${qualityMsg ? "" : "hide"}`}>
                        Trying to Increase Your Camera's Quality
                    </div>
                </div>
                <div
                    className={`pause circle ${pause ? "active" : ""}`}
                    onClick={() => {
                        makePause();
                    }}>
                    <i className='material-icons'>
                        {pause ? "play_arrow" : "pause"}
                    </i>
                </div>
            </div>
            <div className='texts'>
                <Msg msg={msg} count={count} />
            </div>
            <div className={`pausing ${otherPause ? "" : "hide"}`}>
                <i className='material-icons'>pause</i>
            </div>
            <div className='videos'>
                <div className='other' onClick={() => setButtons(!buttons)}>
                    <video
                        ref={otherVideo}
                        alt='other'
                        className={`video ${
                            width() ? "portrate" : "landscape"
                        } ${otherFilter ? otherFilter : ""}`}></video>
                </div>
                {/* my video */}
                <div
                    className={`my ${width() ? "port" : "land"}  ${
                        buttons ? "hide" : ""
                    }`}>
                    <video
                        ref={video}
                        alt='call'
                        className={filter ? filter : ""}></video>
                </div>
            </div>
            <div className='bottom'>
                <div className='capture circle' onClick={flashScreen}>
                    <i className='material-icons'>camera_alt</i>
                </div>
                <div
                    className='hang-up circle'
                    onClick={() => {
                        endCall(comingPro.id ? comingPro.id : profile.id);
                        changeRoute('home');
                    }
                    }>
                    <i className='material-icons'>call_end</i>
                </div>
                <div
                    className={`mute circle ${mute ? "active" : ""}`}
                    onClick={() => makeMute()}>
                    <i className='material-icons'>{mute ? "mic_off" : "mic"}</i>
                </div>
            </div>
        </div>
    );
}

export default Call;

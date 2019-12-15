import React, { useState, useRef } from "react";
import "./Call.css";
//
import { width } from "./../func/func";
//
function Call() {
    const [buttons, setButtons] = useState(false);
    const [textField, setTextField] = useState(false);
    const [filter, setFilter] = useState(false);
    const [filterOption, setFilterOption] = useState(false);
    const [quality, setQuality] = useState(false);
    const [pause, setPause] = useState(false);
    const [qualityMsg, setQualityMsg] = useState(false);
    const [flash, setFlash] = useState(false);
    const [mute, setMute] = useState(false);
    const inputElm = useRef(null);
    const startWriting = () => {
        setTextField(!textField);
        inputElm.current.focus();
    };
    const setFilterFunc = value => {
        setFilter(value);
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
    const flashScreen = () => {
        setFlash(true);
        setTimeout(dismissFlash, 500);
        function dismissFlash() {
            setFlash(false);
        }
    };
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
                    onClick={() => setPause(!pause)}>
                    <i className='material-icons'>
                        {pause ? "play_arrow" : "pause"}
                    </i>
                </div>
            </div>
            <div className='texts hide'>
                <div className='con'>
                    <span className='name'>Keni: </span>
                    <span className='msg'>0910824814</span>
                </div>
                <div className='con'>
                    <span className='name'>Abu: </span>
                    <span className='msg'>tnx mine is-0982481660</span>
                </div>
            </div>
            <div className='pausing hide'>
                <i className='material-icons'>pause</i>
            </div>
            <div className='videos'>
                <div className='other' onClick={() => setButtons(!buttons)}>
                    <img
                        src='video-other-port.jpg'
                        className={`video ${
                            width() ? "portrate" : "landscape"
                        }`}
                    />
                </div>
                <div
                    className={`my ${width() ? "port" : "land"} ${
                        buttons ? "hide" : ""
                    }`}>
                    <img src='video-other.jpg' />
                </div>
            </div>
            <div className='bottom'>
                <div className='capture circle' onClick={flashScreen}>
                    <i className='material-icons'>camera_alt</i>
                </div>
                <div className='hang-up circle'>
                    <i className='material-icons'>call_end</i>
                </div>
                <div
                    className={`mute circle ${mute ? "active" : ""}`}
                    onClick={() => setMute(!mute)}>
                    <i className='material-icons'>{mute ? "mic_off" : "mic"}</i>
                </div>
            </div>
        </div>
    );
}

export default Call;

import React, { useRef, useEffect, useContext } from 'react'
import './Live.css';
import { getStorage, jep } from '../../func/serviceProvider';
import { Router } from '../../Router/Koute';
//
function Live({ stream, sendStream }) {
    const video = useRef(null);
    const { changeRoute } = useContext(Router);
    useEffect(() => {
        if (stream && video) {
                                 video.current.srcObject = stream;
            video.current.muted = true;
            video.current.play();
                             }
        alertOthers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stream, video]);
    const alertOthers = () => {
        setInterval(() => {
            sendStream({ data: jep(localStorage.stream), me: getStorage().me });
        }, 5000);
    };
    const abort = () => {
        changeRoute('home')
    }
    return (
        <div className='live'>
            <video ref={video}></video>
            <button onClick={abort}>
                <i className='material-icons'>close</i>
            </button>
        </div>
    );
}

export default Live

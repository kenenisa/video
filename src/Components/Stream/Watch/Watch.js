import React, { useRef, useEffect, useContext } from 'react'
import './Watch.css';
import { Router } from '../../Router/Koute';
//
let otherPeer = null;
function Watch({ watchStream,swarm }) {
    const video = useRef(null);
    const { changeRoute } = useContext(Router);
    useEffect(() => {
        const peer = swarm.remotes[watchStream.data.me.id];
        otherPeer = peer;
        peer.stream.getTracks()[0].enabled = true;
        if (video) {
            video.current.srcObject = peer.stream;
            video.current.play();
                   }
    }, [watchStream, swarm, video]);
    const abort = () => {
        otherPeer.stream.getTracks()[0].enabled = false;
        changeRoute('home');
    }
    return (
        <div className='watch'>
            <video ref={video}></video>
            <button onClick={abort}>
                <i className='material-icons'>close</i>
            </button>
        </div>
    );
}

export default Watch

import React, { useContext, useState, useEffect } from 'react'
import './Home.css';
import { Router } from './../Router/Koute';
import toastContext from '../../Context/toastContext';
//
function Home() {
    const { changeRoute } = useContext(Router);
    const { createToast } = useContext(toastContext);
    const [online, setOnline] = useState(false);
    const call = () => {
        if (online) {
            changeRoute('contacts')
        } else {
            createToast('You are currently offline. refresh the page when you are connected to some network','r');
        }
    }
    const stream = () => {
        if (online) {
            changeRoute("stream");
        } else {
            createToast(
                "You are currently offline. refresh the page when you are connected to some network",
                "r"
            );
        }
    };
    useEffect(() => {
        if (navigator.onLine) {
            setOnline(true);
        }
    }, []);
    return (
        <div className='home'>
            <div className='con'>
                <div className='mode'>Select mode</div>
                <div
                    className='card call'
                    onClick={call}>
                    <i className='material-icons'>call</i>
                    Call
                </div>
                <div className='card stream' onClick={stream}>
                    <i className='material-icons'>public</i>
                    Stream
                </div>
            </div>
        </div>
    );
}

export default Home

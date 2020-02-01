import React, { useContext, useEffect } from 'react'
import './Coming.css';
import profileContext from '../../../Context/profileContext';
import { Router } from '../../Router/Koute';
function Coming({ reject,callAccepted }) {
    const { comingPro, answer } = useContext(profileContext);
    const { changeRoute } = useContext(Router);
    useEffect(() => {
        callAccepted(comingPro.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className='coming'>
            <div className='name'>
                <span>{comingPro.name}</span>
            </div>
            <div className='button'>
                <div className='reject cirlce' onClick={() => {
                    reject(comingPro.id);
                    changeRoute('home')
                }}>
                    <i className='material-icons'>call_end</i>
                </div>
                <div
                    className='answer cirlce'
                    onClick={() => {
                        answer(comingPro.id);
                        changeRoute("call");
                    }}>
                    <i className='material-icons'>call</i>
                </div>
            </div>
            <div className='background'>
                <img src={comingPro.photo} alt='user' />
            </div>
            {/* <audio autoPlay loop>
                <source src="./ring tone/tone.mp3"/>
            </audio> */}
        </div>
    );
}

export default Coming

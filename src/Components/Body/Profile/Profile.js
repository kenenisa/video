import React,{useContext} from "react";
import "./Profile.css";
import { Router } from "../../Router/Koute";
//
function Profile() {
    const { changeRoute } = useContext(Router);
    return (
        <React.Fragment>
            <div className='background'></div>
            <div className='profile'>
                <div className='user'>
                    <div className='img'>
                        <img src='user-boy.jpg' alt='' />
                    </div>
                    <div className='name'>Kenenisa</div>
                    <div className='buttons'>
                        <button
                            className='call-btn mdl-button mdl-js-ripple-effect mdl-js-button'
                            onClick={() => changeRoute("going")}>
                            <i className='material-icons'>call</i>
                        </button>
                        <button
                            className='alert mdl-button mdl-js-ripple-effect mdl-js-button'
                            onClick={() => changeRoute("contacts")}>
                            <i className='material-icons'>
                                notifications_active
                            </i>
                        </button>
                    </div>
                </div>
                <div className='logs'>
                    <div className='head'>Logs</div>
                    <div className='log'>
                        <div className='left'>
                            <div className='type'>
                                <i className='material-icons made'>call_made</i>
                                <span> ,Outgoing call</span>
                            </div>
                            <div className='time'>Today</div>
                        </div>
                        <div className='right'>
                            <button className='mdl-button mdl-js-ripple-effect mdl-js-button'>
                                <i className='material-icons'>delete</i>
                            </button>
                        </div>
                    </div>
                    <div className='log'>
                        <div className='left'>
                            <div className='type'>
                                <i className='material-icons missed'>
                                    call_missed
                                </i>
                                <span> ,Missed call</span>
                            </div>
                            <div className='time'>Yesterday</div>
                        </div>
                        <div className='right'>
                            <button className='mdl-button mdl-js-ripple-effect mdl-js-button'>
                                <i className='material-icons'>delete</i>
                            </button>
                        </div>
                    </div>
                    <div className='log'>
                        <div className='left'>
                            <div className='type'>
                                <i className='material-icons received'>
                                    call_received
                                </i>
                                <span> ,Received call</span>
                            </div>
                            <div className='time'>Yesterday</div>
                        </div>
                        <div className='right'>
                            <button className='mdl-button mdl-js-ripple-effect mdl-js-button'>
                                <i className='material-icons'>delete</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Profile;

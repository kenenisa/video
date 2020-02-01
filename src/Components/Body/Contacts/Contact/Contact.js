import React, { useContext, useEffect, useState } from "react";
import "./Contact.css";
import { Router } from "../../../Router/Koute";
import profileContext from "../../../../Context/profileContext";
//
//
function Contact({ friend, peers }) {
    const { changeRoute } = useContext(Router);
    const { changeProfile } = useContext(profileContext);
    const [online, setOnline] = useState(false);

    const isOnline = () => {
        if (peers[friend.id]) {
            if (!online) {
                setOnline(true);
            }
        } else {
            if (online) {
                setOnline(false);
            }
        }
    }
    useEffect(() => {
        isOnline();
        var check = setInterval(isOnline, 5000);
        return () => {
            clearInterval(check);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let random = Math.random();
    return (
        <div className='contact'>
            <div className='con'>
                <span
                    onClick={() => {
                        changeProfile(friend);
                        changeRoute("profile");
                    }}>
                    <div className='img-con'>
                        <div className='img'>
                            <img
                                src={friend.photo?friend.photo:'profile.png'}
                                className=''
                                alt='profile'
                            />
                        </div>
                    </div>
                    <div className='text'>
                        <div className='name'>{friend.name}</div>
                        <span className={online?'show':'hide'}>Online</span>
                        <div className='log'>
                            <span className='icon'>
                                <i className='material-icons'>call_made</i>
                            </span>
                            <span className='date'> ,Today</span>
                        </div>
                    </div>
                </span>
                <div className='more'>
                    <button
                        id={`demo-menu-lower-right ${random}`}
                        className='btn mdl-button mdl-js-button mdl-button--icon'>
                        <i className='material-icons'>more_vert</i>
                    </button>

                    <ul
                        className='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect'
                        data-mdl-for={`demo-menu-lower-right ${random}`}>
                        <li className='mdl-menu__item'>
                            <button className='mdl-button mdl-js-button'>
                                <i className='material-icons'>delete</i> Delete
                            </button>
                        </li>
                        <li className='mdl-menu__item'>
                            <button className='mdl-button mdl-js-button'>
                                <i className='material-icons'>edit</i> Edit
                            </button>
                        </li>
                        <li className='mdl-menu__item'>
                            <button className='mdl-button mdl-js-button'>
                                <i className='material-icons'>
                                    do_not_disturb_alt
                                </i>{" "}
                                Clear History
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Contact;

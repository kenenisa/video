import React, { useContext } from "react";
import "./Contact.css";
import { Router } from "../../../Router/Koute";
//
function Contact() {
    const { changeRoute } = useContext(Router);
    let random = Math.random();
    return (
        <div className='contact' onClick={() => changeRoute('profile')}>
            <div className='con'>
                <div className='img-con'>
                    <div className='img'>
                        <img src='user-boy.jpg' className='' />
                    </div>
                </div>
                <div className='text'>
                    <div className='name'>Kenenisa</div>
                    <div className='log'>
                        <span className='icon'>
                            <i className='material-icons'>call_made</i>
                        </span>
                        <span className='date'> ,Today</span>
                    </div>
                </div>
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

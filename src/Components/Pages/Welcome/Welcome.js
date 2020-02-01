import React, { useContext } from "react";
import "./Welcome.css";
import { Router } from "../../Router/Koute";

//
function Welcome() {
    const { changeRoute } = useContext(Router);
    return (
        <div className='welcome'>
            
            <div className='con'>
                <div className='text'>Wellcome</div>
                <div className='intro'>
                    <div className='slide s1'>
                        <div className='icon'>
                            <i className='material-icons'>network_check</i>
                        </div>
                        <div className='Title'>Fast</div>
                        <div className='des'>
                            Modern day tech enables this app to directly connect
                            to your firends which makes it Really Fast!
                        </div>
                    </div>
                    <div className='slide s2'>
                        <div className='icon'>
                            <i className='material-icons'>security</i>
                        </div>
                        <div className='Title'>Secure</div>
                        <div className='des'>
                            Unlike other apps, your data gets saved on your
                            divice without a server Which makes it Super Secure!
                        </div>
                    </div>
                    <div className='slide s3'>
                        <div className='icon'>
                            <i className='material-icons'>
                                sentiment_very_satisfied
                            </i>
                        </div>
                        <div className='Title'>Fun</div>
                        <div className='des'>
                            HD video chating and streaming while you get the
                            best expirance, is Surely a great Fun!
                        </div>
                    </div>
                </div>
                <div className='buttons'>
                    <button
                        className='login'
                        onClick={() => changeRoute("login")}>
                        Log In
                    </button>
                    <button
                        className='signup'
                        onClick={() => changeRoute("signup")}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Welcome;

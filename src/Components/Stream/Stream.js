import React, {  useState } from "react";
import "./Stream.css";
import Header from "../Header/Header";
import Individual from "./Individual/Individual";
import Create from "./Create/Create";

function Stream({ streams, flag, setWatchStream }) {
    const [state, setState] = useState(true);
    return (
        <React.Fragment>
            <Header />
            <main className='mdl-layout__content'>
                <div className='page-content'>
                    <div className='str'>
                        {state ? (
                            <div>
                                <Individual
                                    streams={streams}
                                    flag={flag}
                                    setWatchStream={setWatchStream}
                                />
                                <button
                                    onClick={() => setState(false)}
                                    className='mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect btn'>
                                    <i className='material-icons'>
                                        settings_input_antenna
                                    </i>
                                    CREATE STREAM
                                </button>
                            </div>
                        ) : (
                            <Create setState={setState} />
                        )}
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default Stream;

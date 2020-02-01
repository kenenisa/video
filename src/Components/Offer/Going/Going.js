import React, { useContext, useEffect, useState } from "react";
import "./Going.css";
import { Router } from "../../Router/Koute";
import profileContext from "../../../Context/profileContext";
//
function Going({ state, abort, setState }) {
    const { changeRoute } = useContext(Router);
    const [info, setInfo] = useState("Connecting ...");
    const { profile } = useContext(profileContext);
    useEffect(() => {
        if (state.type === "rejected") {
            setInfo("Your call was Rejected!");
            setTimeout(redirect, 5000);
        } else if (state.type === "accepted") {
            setInfo("Ringing ...");
        } else {
            setInfo("Connecting ...");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
    const redirect = () => {
        setState({ type: null, data: null });
        changeRoute("profile");
    };
    return (
        <div className='going'>
            <audio autoPlay loop>
                <source src='tu.mp3' type='audio/mpeg' />
            </audio>
            <div className='status'>
                <span>{info}</span>
            </div>
            <div
                className='button'
                onClick={() => {
                    changeRoute("contacts");
                    abort(profile.id);
                }}>
                <i className='material-icons'>call_end</i>
            </div>
            <div className='video'>
                <img src='video-other.jpg' alt='video' />
            </div>
        </div>
    );
}

export default Going;

import React, { useContext } from "react";
import './Going.css';
import { Router } from '../../Router/Koute';
//
function Going() {
    const { changeRoute } = useContext(Router);
    return (
        <div className="going">
            <div className="status">
                <span>Connecting ...</span>
            </div>
            <div className="button" onClick={()=>changeRoute('contacts')}>
                <i className="material-icons">
                    call_end
                </i>
            </div>
            <div className="video">
                <img src="video-other.jpg"/>
            </div>
        </div>
    )
}

export default Going

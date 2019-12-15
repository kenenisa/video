import React from 'react'
import './Coming.css';
function Coming() {
    return (
        <div className="coming">
            <div className="name">
                <span>
                    Kenenisa
                </span> 
            </div>
            <div className="button">
                <div className="reject cirlce">
                    <i className="material-icons">
                        call_end
                    </i>
                </div>
                <div className="answer cirlce">
                    <i className="material-icons">
                        call
                    </i>
                </div>
            </div>
            <div className="background">
                <img src="user-boy.jpg" />
            </div>
            {/* <audio autoPlay loop>
                <source src="./ring tone/tone.mp3"/>
            </audio> */}
        </div>
    )
}

export default Coming

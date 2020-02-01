import React, { useState, useContext } from "react";
import "./Create.css";
import { jes } from "../../func/serviceProvider";
import { Router } from "../../Router/Koute";
//
function Create({setState}) {
    const [topic, setTopic] = useState("");
    const [body, setBody] = useState("");
    const { changeRoute } = useContext(Router);
    const createStream = () => {
        if (topic !== '' && body !== '') {   
            localStorage.stream = jes({ topic, body });
            changeRoute('live');
        }
    };
    return (
        <div className='create'>
            <h2>Create your own stream</h2>
            <input
                className=''
                type='text'
                placeholder='Topic'
                onChange={e => setTopic(e.target.value)}
                value={topic}
            />
            <textarea
                placeholder='Discription about the Topic'
                col='30'
                row='15'
                onChange={e => setBody(e.target.value)}
                value={body}></textarea>
            <button onClick={()=>setState(true)} className="ff">Cancle</button>
            <button onClick={createStream} >Create</button>
        </div>
    );
}

export default Create;

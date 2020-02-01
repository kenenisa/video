import React, { useContext, useState } from "react";
import "./Signup.css";
import { Router } from "../../Router/Koute";
import { getStorage } from "../../func/serviceProvider";

//
function Signup() {
    const { changeRoute } = useContext(Router);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [img, setImg] = useState(null);
    const [passwordConf, setPasswordConf] = useState("");
    const [error, setError] = useState({
        name: false,
        password: false,
        confirm: false,
        photo: false
    });
    const [msg, setMsg] = useState(false);
    const setNameFunc = e => {
        setName(e.nativeEvent.target.value);
    };
    const setPasswordFunc = e => {
        setPassword(e.nativeEvent.target.value);
    };
    const setPasswordConfFunc = e => {
        setPasswordConf(e.nativeEvent.target.value);
    };
    const handleFile = e => {
        if (e.target.files[0].type.search("image") === 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = e => {
                setImg(reader.result);
            };
            setMsg(false)
        } else {
         setMsg("The provided file is not an image. Please provide a file with jpg/png extention.");
        }
    };
    const handleSubmit = () => {
        let result = {
            name: name ? false : "empty",
            password: password ? false : "empty",
            confirm: passwordConf ? false : "empty"
        };
        if (name && password && passwordConf) {
            if (password !== passwordConf) {
                setMsg(
                    "Password Confarmation doesn't match with the given password."
                );
            } else {
                const user = getStorage().me;
                user.name = name;
                user.password = password;
                user.photo = img ? img : null;
                localStorage.me = JSON.stringify(user);
                changeRoute('home');
                setMsg(false);
            }
        }
        setError(result);
    };
    return (
        <div className='Signup'>
            <div className='con'>
                <div className='text'>Signup</div>
                <div className='forms'>
                    {error.name ||
                    error.password ||
                    error.confirm ||
                    error.photo ? (
                        <div className='error'>
                            Please fill every field with the aproprate
                            information.
                        </div>
                    ) : 
                        msg ? <div className='error msg'>{msg}</div> : ""}
                    

                    <input
                        type='text'
                        onChange={setNameFunc}
                        placeholder='Username'
                        className={`${error.name ? "br" : ""} name`}
                        value={name}
                    />
                    <input
                        type='password'
                        onChange={setPasswordFunc}
                        placeholder='Password'
                        className={`${error.password ? "br" : ""} password`}
                        value={password}
                    />
                    <input
                        type='password'
                        onChange={setPasswordConfFunc}
                        placeholder='Confirm Password'
                        className={`${error.confirm ? "br" : ""} confirm`}
                        value={passwordConf}
                    />
                    <div className='provide-photo'>
                        <input
                            type='file'
                            placeholder='Provide Photo'
                            className='photo'
                            onChange={handleFile}
                        />
                        <button className='mdl-button mdl-js-button fake-button'>
                            <i className='material-icons'>add</i>
                            Add Photo
                        </button>
                    </div>
                    {name || img ? (
                        <div className='user'>
                            <div className='header'>Signing up as...</div>
                            <div className='img'>
                                <i className='material-icons'>access_time</i>
                                <img
                                    src={img ? img : "profile.png"}
                                    alt={`${name}'s profile`}
                                />
                            </div>
                            <div className='name'>{name}</div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className='buttons'>
                    <button
                        className='login'
                        onClick={() => changeRoute("welcome")}>
                        Cancle
                    </button>
                    <button className='signup' onClick={handleSubmit}>
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;

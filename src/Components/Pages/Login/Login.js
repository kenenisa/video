import React, { useContext, useState } from "react";
import "./Login.css";
import { Router } from "../../Router/Koute";

//
function Login() {
    const { changeRoute } = useContext(Router);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
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
    const handleSubmit = () => {
        let result = {
            name: name ? false : "empty",
            password: password ? false : "empty",
        };
        if (name && password ) {
            const store = JSON.parse(localStorage.me);
            
            if (name.toLowerCase() === store.name.toLowerCase()) {
                if (password.toLowerCase() === store.password.toLowerCase()) {
                    changeRoute('Home');
                } else {
                    setMsg('Username or Password is not Correct.')
                }
            } else {
                    setMsg('Username or Password is not Correct.')
                }
        }
        setError(result);
    };

    return (
        <div className='Login'>
            <div className='con'>
                <div className='text'>Login</div>
                <div className='forms'>
                    {error.name ||
                    error.password ||
                    error.confirm ||
                    error.photo ? (
                        <div className='error'>
                            Please fill every field with the aproprate
                            information.
                        </div>
                    ) : msg ? <div className='error'>{msg}</div> : ""}
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
                </div>
                <div className='buttons'>
                    <button
                        className='login'
                        onClick={() => changeRoute("welcome")}>
                        Cancle
                    </button>
                    <button
                        className='signup'
                        onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;

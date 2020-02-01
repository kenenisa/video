import React from 'react'
import './Pages.css';
//
import { Route } from './../Router/Koute';
import Welcome from './Welcome/Welcome';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Particle from "./Particle";
//
function Pages() {
    return (
        <div className="pages">
            <div className='bg'>
                <Particle />
            </div>
            <Route path='welcome' component={() => <Welcome />} />
            <Route path='signup' component={() => <Signup />} />
            <Route path='login' component={() => <Login />} />
        </div>
    );
}

export default Pages

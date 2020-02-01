import React from "react";
// import Peer from "simple-peer";
//
import Contacts from "./Contacts/Contacts";
import Profile from "./Profile/Profile";
import { Route } from "./../Router/Koute";

//
function Body({ peers }) {
    return (
        <main className='mdl-layout__content'>
            <div className='page-content'>
                <Route path='contacts' component={()=><Contacts peers={peers}/>} />
                <Route path='profile' component={Profile} />
            </div>
        </main>
    );
}

export default Body;


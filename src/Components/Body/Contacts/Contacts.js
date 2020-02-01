import React, { useState, useEffect } from 'react'
import './Contacts.css';
//components
import Contact from './Contact/Contact';
import { getStorage } from '../../func/serviceProvider';
//
function Contacts({ peers }) {
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        setFriends(getStorage().other);
    }, []);
    return (
        <div className='contacts'>
            {!friends[0] ? <div className="no-contact">
                There are no contacts online yet. Stay online and wait or come back later.
            </div>:''}
            {friends.map((friend, key) => (
                <Contact friend={friend} key={key} peers={peers}/>
            ))}
        </div>
    );
}

export default Contacts

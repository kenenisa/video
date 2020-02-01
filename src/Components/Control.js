import React from 'react'
//components
import Header from './Header/Header';
import Body from './Body/Body';
//
function Control({peers}) {
    return (
        <React.Fragment>
            <Header />
            <Body peers={peers}/>
        </React.Fragment>
    );
}

export default Control

import React from 'react'
//components
import Header from './Header/Header';
import Drawer from './Drawer/Drawer';
import Body from './Body/Body';
//
function Control() {
    return (
        <React.Fragment>
                <Header />
                <Drawer />
                <Body />
        </React.Fragment>
    );
}

export default Control

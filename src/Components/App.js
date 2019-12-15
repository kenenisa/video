import React from "react";
import "./App.css";
//components
import Control from "./Control";
import Call from "./Call/Call";
import Coming from "./Offer/Coming/Coming";
import Going from "./Offer/Going/Going";
//tools
import { Wrapper,Route } from "./Router/Koute";
//
export default function App() {
    const conn = true;
    return (
        <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
            <Wrapper base='contacts'>
                <Route path='contacts' component={Control} />
                <Route path='profile' component={Control} />
                <Route path='call' component={Call} />
                <Route path='coming' component={Coming} />
                <Route path='going' component={Going} />
            </Wrapper>
        </div>
    );
    // return (
    //     <div>
    //         {conn ? (
    //             <Call />
    //         ) : (
    //             <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
    //                 <Control />
    //             </div>
    //         )}
    //     </div>
    // );
}

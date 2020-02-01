import React, { useEffect, useContext } from 'react'
import { Router } from '../Router/Koute';

function Responder({ state, fakeRoute }) {
    const { changeRoute } = useContext(Router);
    useEffect(() => {
        if (state) {
            if (state === "ring") {
                changeRoute("coming");
            } else if (state === "connected") {
                changeRoute("call");
            } else if (state === 'abort') {
                changeRoute('home');
            } else if (state === 'end') {
                changeRoute('home');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
    useEffect(() => {
        if (fakeRoute !== '') {
            changeRoute(fakeRoute);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fakeRoute]);
    return <React.Fragment></React.Fragment>;
}

export default Responder

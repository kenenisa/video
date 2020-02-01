import React, { useState, useContext } from "react";
export function Wrapper({ base, children }) {
    const [route, setRoute] = useState(base);
    const [history, addHistory] = useState([base]);
    const changeRoute = (to, back = false) => {
        if (back) {
            if (history[1]) {
                setRoute(history[history.length - 2]);
                history.pop();
                addHistory(history);
            }
        } else {
            setRoute(to);
            addHistory([...history, to]);
        }
    };
    return (
        <React.Fragment>
            <Router.Provider value={{ route, changeRoute }}>
                {children}
            </Router.Provider>
        </React.Fragment>
    );
}
export const Router = React.createContext({ route: "", changeRoute: () => {} });
export function Route({ path, component }) {
    const { route } = useContext(Router);
    if (route.toLowerCase() === path.toLowerCase()) {
        return <React.Fragment>{component()}</React.Fragment>;
    } else {
        return null;
    }
}

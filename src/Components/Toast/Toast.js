import React, { useContext, useEffect, useState } from "react";
import "./Toast.css";
import toastContext from "../../Context/toastContext";

function Toast() {
    const { toast, createToast } = useContext(toastContext);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (toast.text !== "") {
            setVisible(true);
            setTimeout(delayVisible, 3000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toast]);
    const delayVisible = () => {
        setVisible(false);
        setTimeout(delayErase, 500);
    };
    const delayErase = () => {
        createToast("", "");
    };
    return (
        <div className={`${toast.type} toast ${visible ? "show" : "hide"}`}>
            {toast.text}
        </div>
    );
}

export default Toast;

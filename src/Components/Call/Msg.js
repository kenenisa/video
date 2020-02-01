import React, { useState, useEffect } from "react";

function Msg({ msg,count }) {
    const [data, setData] = useState(msg);
    useEffect(() => {
        setData(msg);
        console.log('count is changing: ', count, msg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);
    return (
        <div>
            {data.map((text, key) => (
                    <div className='con' key={key}>
                        <span className='name'>
                            {text.name}
                            {`: `}
                        </span>
                        <span className='msg'>{text.msg}</span>
                    </div>
                ))}
        </div>
    )
}

export default Msg

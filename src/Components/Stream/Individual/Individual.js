import React, { useState, useEffect, useContext } from 'react'
import './Individual.css';
import { Router } from '../../Router/Koute';
//
function Individual({ streams, flag,setWatchStream }) {
    const [datas, setDatas] = useState([]);
    const { changeRoute } = useContext(Router);
    useEffect(() => {
        setDatas(streams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flag])
    const indivi = (data) => {
        setWatchStream(data)
        changeRoute('watch');
    }
    return (
        <div>
            {!datas[0] ? (
                <div className='err'>
                    There are no streams avilable right now, but you can create
                    your own below!
                </div>
            ) : (
                ""
            )}

            {datas.map((data, key) => (
                <div className='ind' key={key} onClick={()=>indivi(data)}>
                    <div className='topic'>
                        {data.data.data.topic}
                    </div>
                    <div className='body'>
                        
                        {data.data.data.body}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Individual

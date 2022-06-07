import React from 'react'

import { timerInitialState } from '../hooks/timerReducer';

export default function TimerInput({ render, setRender }) {
    const [title, setTitle] = React.useState("");

    const handleAddTimer = (e, title) => {
        if(e.key === "Enter") {
            const keys = Object.keys(localStorage);
            let storedTimers = [];
            let i = keys.length;
            
            while(i--) {
            storedTimers.push(JSON.parse(localStorage.getItem(keys[i])));
            }

            const newTimer = {
                ...timerInitialState,
                id: title,
                title: title
            }

            const timer = storedTimers.find((storedTimer) => storedTimer.id == newTimer.id);

            if(!timer) {
                localStorage.setItem(`${title}`, JSON.stringify(newTimer));
                setRender(!render);
            }
        }
    }

    return (
        <div className="my-4">
            <input
            className="block px-2 py-1 border border-black mt-2 mx-auto" placeholder="ADD TIMER HERE!"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => handleAddTimer(e, title)} />
        </div>
    )
}

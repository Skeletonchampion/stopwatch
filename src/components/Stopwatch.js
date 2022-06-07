import React from 'react'

import { timerInitialState, timerReducer } from '../hooks/timerReducer';

import Reset_Icon from '../icons/Reset_Icon';
import Remove_Icon from '../icons/Remove_Icon';

export default function Stopwatch({ timer, handleDeleteTimer }) {
    const [toggle, setToggle] = React.useState(true);
    const [timerState, timerDispatch] = React.useReducer(timerReducer, timerInitialState);
    const { id, title, time, /* now, */ pauseAt, /* pauseTime, */ /* isActive, */ isStarted } = timerState;
    
    React.useEffect(() => {
        const storedItems = { ...timer };
        timerDispatch({ type: "GET_STORED_ITEMS", payload: storedItems });
    }, []);

    React.useEffect(() => {
        if(id != '' && id != null) {
            localStorage.setItem(`${id}`, JSON.stringify(timerState));
        }
    }, [timerState]);

    React.useEffect(() => {
        let interval = null;

        if(timerState.isActive) {
            if(!isStarted) {
                timerDispatch({ type: "SET_FIELD", field: "isStarted", payload: true });
                timerDispatch({ type: "SET_FIELD", field: "now", payload: new Date().getTime() });
            }

            let now = new Date().getTime();
            if(timerState.now !== -1) {
                now = timerState.now;
            }
            const pauseTime = (timerState.pauseTime !== -1 ? timerState.pauseTime : 0);

            const f = () => {
                const then = new Date().getTime();

                const diff = (then - now) - pauseTime;

                timerDispatch({ type: "SET_FIELD", field: "time", payload: diff });
            }

            interval = setInterval(f, 100);
        }
        else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        }
    }, [timerState.isActive]);

    const handleSetIsActive = (isActive) => {
        if(isActive === timerState.isActive) return;

        timerDispatch({ type: "SET_FIELD", field: "isActive", payload: isActive });
        
        if(isActive === false) {
            timerDispatch({ type: "SET_FIELD", field: "pauseAt", payload: new Date().getTime() });
        }
        else {
            if(pauseAt != -1) {
                const then = new Date().getTime(); 
                const pauseTime = (then - pauseAt);

                timerDispatch({ type: "ADD_PAUSE_TIME", payload: pauseTime });
            }
            timerDispatch({ type: "SET_FIELD", field: "pauseAt", payload: -1 });
        }
    }
    const handleResetTimer = () => {
        // const answer = window.confirm("ARE YOU SURE?");
        const answer = true;
        if(answer) {
            timerDispatch({ type: "RESET_TIMER" });
            setToggle(!toggle);
        }
    }

    const handleToggle = () => {
        setToggle(!toggle);
    }

    return (
        <div
        className="relative w-[330px] sm:w-[590px] text-black bg-neutral-200 border border-neutral-400 rounded-lg shadow-md mb-2">
            <h1
            onClick={handleToggle}
            className="text-2xl font-bold my-3 mx-16 text-center cursor-default">{title}</h1>
            <div className="flex flex-col justify-center items-center min-h-[150px]">
            <div
            onClick={() => handleSetIsActive(!timerState.isActive)}
            className={`font-medium text-3xl mt-2 mb-8 transition-opacity
            duration-300 ${timerState.isActive ? "opacity-100" : "opacity-30"}
            cursor-pointer select-none`}>
                <span>{("0" + Math.floor((time / 3600000) % 100)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
            </div>
            <div>
                <button className="absolute top-0 left-0 button opacity-30" onClick={() => handleResetTimer()}>
                    <Reset_Icon width="48px" height="48px" />
                </button>
                <button className="absolute top-0 right-0 button opacity-30" onClick={() => handleDeleteTimer(id)}>
                    <Remove_Icon width="48px" height="48px" />
                </button>
            </div>
            </div>
        </div>
    )
}

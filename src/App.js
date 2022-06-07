import './App.css';
import React from "react";

import { nanoid } from "nanoid";

import Stopwatch from './components/Stopwatch';
import TimerInput from './components/TimerInput';

function App() {
    const [render, setRender] = React.useState(false);
    const [timers, setTimers] = React.useState([]);

    React.useEffect(() => {
        const keys = Object.keys(localStorage);
        let storedTimers = [];
        let i = keys.length;
        
        while(i--) {
          storedTimers.push(JSON.parse(localStorage.getItem(keys[i])));
        }

        setTimers(storedTimers);
    }, [render]);

    const handleDeleteTimer = (id) => {
        const answer = window.confirm("ARE YOU SURE?");
        if(answer) {
            localStorage.removeItem(`${id}`);

            setRender(!render);
        }
    }
    return (
        <div>
            <TimerInput render={render} setRender={setRender} />
            <div className="flex flex-col flex-wrap items-center">
                {timers.map((timer) => {
                    return <Stopwatch key={nanoid()} timer={timer} handleDeleteTimer={handleDeleteTimer} />
                })}
            </div>
        </div>
    );
}

export default App;

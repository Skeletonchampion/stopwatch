export const timerInitialState = {
    id: "",
    title: "",
    time: 0,
    now: -1,
    pauseAt: -1,
    pauseTime: -1,
    isActive: false,
    isStarted: false
}

export function timerReducer(state, action) {
    switch(action.type) {
        case "GET_STORED_ITEMS": {
            const { id, title, time, now, pauseAt, pauseTime, isActive, isStarted } = action.payload;

            return {
                id,
                title,
                time,
                now,
                pauseAt,
                pauseTime,
                isActive,
                isStarted
            }
        }
        case "ADD_PAUSE_TIME": {
            let tempPauseTime = 0;
            if(state.pauseTime !== -1) {
                tempPauseTime = state.pauseTime;
            }
            
            return {
                ...state,
                pauseTime: tempPauseTime + action.payload
            }
        }
        case "RESET_TIMER": {
            return {
                ...state,
                time: 0,
                now: -1,
                pauseAt: -1,
                pauseTime: -1,
                isActive: false,
                isStarted: false
            }
        }
        case "SET_FIELD": {
            return {
                ...state,
                [action.field]: action.payload
            }
        }
        default: {

        }
    }
}
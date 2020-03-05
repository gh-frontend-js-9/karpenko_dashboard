import { LOGIN, LOGOUT } from './actions';

const defaultState = {
    id: localStorage.getItem("user_id") || " "
}

export const user = (state = defaultState, action: {
    type: string,
    payload: string,
    setUserDateToLocalStorage: () => void,
    clearLocalStorage: () => void
}) => {
    switch(action.type){
        case LOGIN:{
            action.setUserDateToLocalStorage();
            return {
                ...state,
                id: action.payload
            }
        }
        case LOGOUT:{
            action.clearLocalStorage();
            return {
                ...state,
                id: ""
            }
        }
        // if not return value => app not started
        default: 
            return defaultState
    }
}

import { ActionType } from '../action_types/index';
import { actionTypeSchema } from '../actions/index'

type initialStateType = {
    data: Array<any>
}

const initialState:initialStateType = {
    data: []
}

function rootReducer(state:initialStateType = initialState, action:actionTypeSchema){
    if(action.type === ActionType.ADD){
        return Object.assign({}, state, {
            data: state.data.concat(action.payload)
        })
    }
    return state;
}

export default rootReducer;
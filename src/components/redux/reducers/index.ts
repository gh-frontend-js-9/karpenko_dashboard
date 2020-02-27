import { ActionType } from '../action_types/index';
import { actionTypeSchema } from '../actions/index';

type initialStateType = {
    data: Array<object>,
    dashboard_page: Array<object>
}

const initialState:initialStateType = {
    data: [],
    dashboard_page: []
}

function rootReducer(state:initialStateType = initialState, action:actionTypeSchema){
    if(action.type === ActionType.ADD){
        return Object.assign({}, state, {
            data: state.data.concat(action.payload)
        })
    }
    if(action.type === ActionType.CHANGE_DASHBOARD_PAGE){
        return Object.assign({}, state, {
            dashboard_page: state.dashboard_page.concat(action.payload)
        })
    }
    return state;
}

export default rootReducer;
import { ActionType } from '../action_types/index';
import store from '../store/index';

export type actionTypeSchema = {
    type: ActionType,
    payload: object
}

export default class Add{
    add(payload:object): actionTypeSchema{
        store.dispatch({
            type: ActionType.ADD,
            payload: payload
        })
        return {
            type: ActionType.ADD,
            payload
        }
    }
    clear(){
        store.getState().data = []
    }
    change_dashboard_page(payload:object):actionTypeSchema{
        store.dispatch({
            type: ActionType.CHANGE_DASHBOARD_PAGE,
            payload: payload
        })
        return {
            type: ActionType.CHANGE_DASHBOARD_PAGE,
            payload
        }
    }
}
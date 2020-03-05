import { combineReducers, createStore } from 'redux';
// 
import { LOGOUT } from './auth/actions';
import { user } from './auth/reducers';

const appReducers = combineReducers({
    user
});

export const rootReducer = (state: any, action: any) => {
    if(action.type === LOGOUT){
        state = undefined;
    }
    return appReducers(state, action);
};

export const store = createStore(rootReducer);
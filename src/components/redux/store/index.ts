import  { createStore } from 'redux';
import rootReducer from '../reducers/index';
import { ActionType } from '../action_types';
import Action from '../actions/index';

const store = createStore(rootReducer);
store.subscribe(() => {
    console.log('subscribe', store.getState());
})

new Action().add({lenght: 34})

export default store;

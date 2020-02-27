import store from '../store/index';

export default class Utils {
    constructor(){}

    getObject(desired_key:string | any){
        if(store.getState().data.length > 0){
            Object.values(store.getState().data).forEach((value:any | string) => {
                return value.desired_key
            })
        }
    }
}
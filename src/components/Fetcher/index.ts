import axios from 'axios';
import {FetchConfig} from './config';

export default class Fetcher{
    token(mode: string):any{
        switch(mode){
            case "auth":
                return {
                    "Content-Type": "application/json",
                    "x-auth-token": FetchConfig.key
                }
            case "access":
                return {
                    "Content-Type": "application/json",
                    "x-access-token": FetchConfig.key
                }
            case 'no_token': {
                return {
                    "Content-Type": "application/json",
                    // "x-aut-token": null
                }
            }
            case 'none':
                return {
                    "Content-Type": "application/json"
                }
        }
    }
    get(path: string, mode: string){
        return axios({
            method: 'GET',
            url: `https://${FetchConfig.domain}/${path}`,
            headers: this.token(mode)
        })
    }
    post(path: string, mode: string, data: any){
        return axios({
            url: `https://${FetchConfig.domain}/${path}`,
            method: 'POST',
            headers: this.token(mode),
            data: JSON.stringify(data)
        })
    }
    delete(path: string, mode: string, params?: any){
        return axios({
            url: `https://${FetchConfig.domain}/${path}`,
            method: 'DELETE'
        })
    }
    put(path: string, mode: string, params: object){
        return axios({
            url: `https://${FetchConfig.domain}/${path}`,
            method: 'PUT',
            headers: this.token(mode),
            data: JSON.stringify(params)
        })
    }
}
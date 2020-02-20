import React , {Component} from "react";
import Login from './auth/Login';
import {AuthState} from './auth/Login';

export default class Home extends Component<{}, AuthState> {
    check():boolean{
        this.state = {
            isAuthorized: false
        }
        return this.state.isAuthorized || false;
    }
    render(){
        const isAuthorized:boolean = this.check();
        switch(isAuthorized){
            case false: 
                return (<Login/>);
        }
    }
}
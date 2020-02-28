import React, { Component } from 'react';
import { AuthState } from './Login';
import {
    Link
  } from "react-router-dom";


export enum HomePages {
    "LOGIN" = "login",
    "SIGNUP" = "signup",
    "RESET" = "reset"
}

type AuthProps = {
    mode: HomePages
}

export default class MenuAuth extends Component <AuthProps, AuthState> {

    render(){
        switch(this.props.mode){
            case HomePages.LOGIN:
                return (
                    <div className="link__wrapper">
                        <Link to = "/signup" className = "link_orange">Sign Up</Link>
                        <Link to = "/reset" className="link_orange">Reset password</Link>
                    </div>
                )
            case HomePages.SIGNUP:
                return (
                    <div className="link__wrapper">
                        <Link to = "/" className = "link_orange">Login</Link>
                        <Link to = "/reset" className = "link_orange">Reset password</Link>
                    </div>
                )
            case HomePages.RESET:
                return (
                    <div className="link__wrapper">
                        <Link to = "/" className = "link_orange">Login</Link>
                        <Link to = "/signup" className = "link_orange">Sign Up</Link>
                    </div>
            )
        }
    }

}
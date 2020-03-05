import React , { Component } from "react";
import Fetcher from "../Fetcher/index";
import Menu, { HomePages } from './Menu';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { Redirect } from "react-router-dom";

type LoginStateItem = {
    email: string,
    password: string,
    isAuth: boolean
}

export type AuthState = {
    isAuthorized: boolean
}

export default class Login extends Component<{}, LoginStateItem> {
    private email: React.RefObject<HTMLInputElement>;
    private password: React.RefObject<HTMLInputElement>;

    constructor(props:{}){
        super(props);

        this.state = {
            email: "",
            password: "",
            isAuth: false
        }

        this.email = React.createRef();
        this.password = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        document.title = "Login";
    }
    
    redirect(){
        if(this.state.isAuth === true){
            return (
                <Redirect to = "/dashboard"/>
            )
        }
    }

    handleSubmit(event: React.FormEvent){
        event.preventDefault();
        let { email, password } = this.state;
        new Fetcher().post(`api/users/login`, "none", {
            email: email,
            password: password
        }).then(response => {
            if(response.status > 199 && response.status < 400){
                this.setState({
                    isAuth: true
                })
                // hooks i cant use in class!
                localStorage.setItem("user_id", response.data._id);
                // 
                this.redirect();
            }
        })
        .catch(error => {
            alert(error)
        })
    }

    handleChange(event: { target: HTMLInputElement }){
        switch(event.target.name){
            case "password": {
                this.setState({
                    password: event.target.value
                })
                break;
            }
            case "email": {
                this.setState({
                    email: event.target.value
                })
                break;
            }
        }
    }

    render(){
        if(this.state.isAuth) {
            return this.redirect();
        };
        return (
            <div className="form form__auth block__centered">
                <div className="form__image">
                    <FontAwesomeIcon
                        icon={faUserCircle}
                        size="7x"
                        color="gold"
                    />
                </div>
                <form onSubmit={ this.handleSubmit }>
                    <input 
                        className = "input__element input__group"
                        type = "email" 
                        name = "email" 
                        value = { this.state.email }
                        placeholder = "Email"
                        onChange = { this.handleChange }
                        ref = { this.email }
                    />
                    <input 
                        className = "input__element input__group"
                        type = "password" 
                        name = "password" 
                        value = { this.state.password }
                        placeholder = "Password"
                        onChange = { this.handleChange }
                        autoComplete = "password"
                        ref = { this.password }
                    />
                    <button 
                        className="form__button"
                        type="submit">
                        Log in
                    </button>
                </form>
                <Menu mode = { HomePages.LOGIN }/>
            </div>
        )
    }
}
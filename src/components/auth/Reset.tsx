import React , {Component} from "react";
import fetcher from "../Fetcher/index";
import Menu, { HomePages } from './Menu';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

interface LoginStateItem {
    email: string,
    password: string,
    confirmationPassword: string
}

export default class Login extends Component<{}, LoginStateItem> {
    constructor(props:any){
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmationPassword: ""
        }

        document.title = "Reset"

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event: React.FormEvent){
        event.preventDefault();
        let {email, password, confirmationPassword} = this.state;
        const Fetcher = new fetcher();
        Fetcher.post(`api/users/reset_password`, "auth", {
            email: email,
            password: password,
            confirmationPassword: confirmationPassword
        }).then(response => {
            console.log(response)
            if(response.status > 199 && response.status < 400){
                alert('Success')
            }
        })
        .catch(error => {
            console.log("login error", error)
        })
        
    }
    handleChange(event: { target: HTMLInputElement }){
        switch(event.target.name){
            case "email": {
                this.setState({
                    email: event.target.value
                })
                break;
            }
            case "password": {
                this.setState({
                    password: event.target.value
                })
                break;
            }
            case "confirmationPassword": {
                this.setState({
                    confirmationPassword: event.target.value
                })
                break;
            }
        }
    }
    render(){
        return (
            <div className="form form__auth block__centered">

                <div className="form__image">
                    <FontAwesomeIcon
                        icon={faUserCircle}
                        size="7x"
                        color="gold"
                    />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        className="input__element input__group"
                        type="email" 
                        name="email" 
                        value={this.state.email}
                        placeholder="Email"
                        onChange={this.handleChange}
                    />
                    <input 
                        className="input__element input__group"
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.handleChange}
                        autoComplete="password"
                    />
                    <input 
                        className="input__element input__group"
                        type="password" 
                        name="confirmationPassword"
                        placeholder="ConfirmationPassword"
                        autoComplete = ""
                        value={this.state.confirmationPassword}
                        onChange={this.handleChange}
                    />
                    <button 
                        className="form__button"
                        type="submit">
                        Reset
                    </button>
                </form>
                <Menu mode = {HomePages.RESET}/>
            </div>
        )
    }
}
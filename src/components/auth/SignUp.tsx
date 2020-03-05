import React , {Component} from "react";
import fetcher from "../Fetcher/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import Menu, { HomePages } from './Menu';
import { Redirect } from "react-router-dom";

interface SignUpStateItem {
    email: string,
    password: string,
    name: string
}

export default class SignUp extends Component<{}, SignUpStateItem> {
    constructor(props:any){
        super(props);

        this.state = {
            email: "",
            password: "",
            name: ""
        }

        document.title = "Sign Up"

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event: React.FormEvent){
        event.preventDefault();
        let {email, password} = this.state;
        const Fetcher = new fetcher();
        Fetcher.post(`api/users`, "auth", {
            name: this.state.name,
            email: email,
            password: password
        }).then(response => {
            console.log(response)
            if(response.status > 199 && response.status < 400){
                this.redirectToHome();
            }
        })
        .catch(error => {
            console.log("login error", error)
        })
        
    }

    redirectToHome(){
        return <Redirect to = "/"/>
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
            case "name": {
                this.setState({
                    name: event.target.value
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
                        type="text" 
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
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
                    <button 
                        className="form__button"
                        type="submit">
                        Sign Up
                    </button>
                </form>
                <Menu mode = { HomePages.SIGNUP } />
            </div>
        )
    }
}
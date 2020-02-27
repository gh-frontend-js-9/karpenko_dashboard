import React, { Component } from 'react';
import Fetcher from '../../../Fetcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

type SendMessageState = {
    message: string | File,
    _id: string
}

export default class SendMessage extends Component <{}, SendMessageState> {
    
    componentDidMount(){
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getId(){
        if(localStorage.getItem("user_id")){
            return localStorage.getItem("user_id");
        }
    }


    handleChange(event: { target: HTMLInputElement }){
        switch(event.target.name){
            case "message":
                this.setState({
                    message: event.target.value
                })
                break;
        }
    }

    handleSubmit(event: React.FormEvent){
        event.preventDefault();
        let { message }  = this.state;

        new Fetcher().post('api/threads/messages', 'access', {
            thread: {
                _id: this.getId()
            },
            message: {
                body: message
            }
        })
    }

    render(){
        return(
            <article className="main_content__input__wrapper">
                <input onChange = { this.handleChange } type="text" name = "message" className="main_content__input_tag"/>
                <span className = "main_content__input__icon">
                    <FontAwesomeIcon
                        icon = { faAngleDoubleRight }
                        size = "lg"
                        onClick = { this.handleSubmit }
                    />
                </span>
            </article>
        )
    }
}

import React, { Component } from 'react';
import { AllThreadStructure } from '../types';
import Fetcher from '../../../Fetcher';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import typy from 'typy';
import moment from 'moment';

type ThreadProps = {
    thread: Array<any>
}

type UsersListState = {
    users_amount: number,
    users: Array<any>,

    thread: Array<any>,
    thread_amount: number
}

export default class UsersList extends Component <ThreadProps, UsersListState> {
    constructor(props:any){
        super(props)
        
        this.get_threads_messages();
        this.get_users_server_data();
        this.state = {
            users: [],
            users_amount: 0,

            thread: [],
            thread_amount: 0
        }
    }

    async get_users_server_data(){
        const users_response: any = await new Fetcher().get(`api/users/all`, 'access')
        .then(response => { return response })
        if(users_response.status > 199 && users_response.status < 400){
            this.setState({
                users: users_response.data,
                users_amount: users_response.data.length
            })
        }
    }

    async get_threads_messages(){
        const thread_messages_response:any = await new Fetcher().get('api/threads/messages/5e1a1c818ec2f49ab3e59ab2', 'access')
            .then(response => { return response; })
            if(thread_messages_response.status > 199 && thread_messages_response.status < 400){
                this.setState({
                    thread: thread_messages_response.data,
                    thread_amount: thread_messages_response.data.length
                })
            }
    }

    user_field(value:AllThreadStructure){
        return (
            <li key = {value._id} className = "main_content__item__wrapper main_content__list_item main_content__list__border">
                <article className = "main_content__item__wrapper">
                    <div className = "main_content__flex_container main_content__flex_container_justify-content">
                        <div className="main_contnet__wrapper">
                            <span className = "main_content__item__photo">
                                <FontAwesomeIcon
                                    icon = { faUserCircle }
                                    size = "2x"
                                    className = "main_content__item__img_tag"
                                />
                            </span>
                            <span className = "main_content__item__header">{ typy(value, "user.name").safeObject }</span>
                        </div>
                        <div className="main_contnet__wrapper">
                            <span className = "main_content__item__subheader color_blue text_base">{ moment(value.created_at).fromNow() }</span>
                        </div>
                    </div>
                    <div className="main_content__item__flex_block main_content__indent">
                        <span className="main_content__item__base text_base">{value.body}</span>
                    </div>
                </article>
            </li>
        )
    }

    render(){
        if(this.state.users.length){
            return (
                <article className = "main_content__item box_shadow">
                    <ul className = "main_content__list__item">
                        { 
                            this.state.thread.map((value: AllThreadStructure) => {
                                return this.user_field(value)
                            }) 
                        }
                    </ul>
                </article>
            )
        }else{
            return (
                <div></div>
            )
        }
    }
}


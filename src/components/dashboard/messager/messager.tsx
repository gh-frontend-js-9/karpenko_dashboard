import React, { Component } from 'react';
import { MessagerState } from './types';
import { MessagesHeader } from '../headers/headers';

import Users from './users/users_list';
import Messages from './messages/messages';
import CurrentUser from './current_user/current_user';

import Fetcher from '../../Fetcher';
import Preloader from '../preloader';

export default class Messager extends Component <{}, MessagerState> {
    constructor(props: any){
        super(props);
        this.get_thread_server_data();
        this.get_current_user();

        this.state = {
            thread: [],
            thread_amount: 0,

            current_user: {
                name: "",
                _id: "",
                email: ""
            }
        }

        document.title = "Messages";
    }

    async get_thread_server_data(){
        const thread_response: any = await new Fetcher().get(`api/threads?sort=desc`, 'access')
            .then(response => { return response })
        if(thread_response.status > 199 && thread_response.status < 400){
            this.setState({
                thread: thread_response.data,
                thread_amount: thread_response.data.length
            })
        }
    }

    async get_current_user(){
        const current_user_response: any = await new Fetcher().get(`api/users`, 'access')
        .then(response => { return response })
        if(current_user_response.status > 199 && current_user_response.status < 400){
            this.setState({
                current_user: current_user_response.data
            })
        }
    }

    messagerComponent(thread: Array<any>){
        return [
            <MessagesHeader inbox = {thread.length}/>,
            <section className = "main_content__section">
                <Users thread = {this.state.thread}/>
                <Messages/>
                <CurrentUser/>
            </section>
        ]
    }

    render(){
        let { thread } = this.state;
        if(this.state.thread.length){
            return [
                <MessagesHeader inbox = {thread.length}/>,
                <section className = "main_content__section">
                    <Users thread = {this.state.thread}/>
                    <Messages/>
                    <CurrentUser/>
                </section>
            ]
        }else{
            return <Preloader/>
        }
    }
}
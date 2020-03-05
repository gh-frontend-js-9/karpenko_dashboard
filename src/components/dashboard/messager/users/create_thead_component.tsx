import React, { Component } from 'react';
import Fetcher from '../../../Fetcher';
import { AllThreadStructure } from '../types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-responsive-modal';
import typy from 'typy';
import moment from 'moment';

type CreateThreadState = {
    // user: {
    //     id: string
    // },
    open: boolean,
    users: Array<any>
}

export default class CreateThread extends Component <{}, CreateThreadState> {
    constructor(props: any){
        super(props);

        this.state = {
            // user: {
            //     id: localStorage.getItem("user_id") as string
            // },
            open: false,
            users: []
        }

        this.get_server_data();
    }

    onOpenModal(){
        this.setState({
            open: true
        })
    }
    onCloseModal(){
        this.setState({
            open: false
        })
    }

    // get all users
    async get_server_data(){
        const users_response: any = await new Fetcher().get(`api/users/all`, 'access')
        .then(response => { return response })
        if(users_response.status > 199 && users_response.status < 400){
            this.setState({
                users: users_response.data
            })
        }
    }

    createThreadRequest(id:string){
        new Fetcher().post('api/threads', 'access', {
            user:{
                _id: id
            }
        })
        .then(response => {
            if(response.status > 199 && response.status < 400){
                alert("Success");
            }
        })
    }

    user_field(value:AllThreadStructure){
        return (
            <li key = { value._id } className = "main_content__item__wrapper main_content__list_item main_content__list__border"
                onClick = { () => {
                    this.createThreadRequest(value._id);
                } }
            >
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
                            <span className = "main_content__item__header">{ typy(value, "name").safeObject }</span>
                        </div>
                        <div className="main_contnet__wrapper">
                            <span className = "main_content__item__subheader color_blue text_base">{ moment(value.created_at).fromNow() }</span>
                        </div>
                    </div>
                    <div className="main_content__item__flex_block main_content__indent">
                        <span className="main_content__item__base text_base">{ value.body }</span>
                        <span></span>
                    </div>
                </article>
            </li>
        )
    }

    render(){
        const { open } = this.state;
        if(!this.state.users){
            return (
                <div></div>
            )
        }
        return (
            <div className="modal-window">
                <div onClick = { () => { 
                        this.setState({open: true}) 
                    }}
                    className = "text_center">
                    {/* <span>
                        <FontAwesomeIcon
                            icon = { faPlus }
                            className = "table__icon"
                        />
                    </span> */}
                    <span className = "table__icon text_header">Click to add thread</span>
                </div>
                <Modal open = { open } onClose = { () => {
                        this.setState({ open: false }) 
                    }} center>
                    <div className="modal-window__flex-container">
                        <ul>
                            { 
                                this.state.users.map(value => {
                                    return this.user_field(value);
                                }) 
                            }
                        </ul>
                    </div>
                </Modal>
            </div>
        )
    }
}
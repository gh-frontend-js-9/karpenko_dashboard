import React, { Component } from 'react';
import Fetcher from '../../../Fetcher';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import SendMessageComponent from './input_component';

import { AllThreadStructure } from '../types';

type MessagesState = {
    data: Array<AllThreadStructure>
}

export default class Messages extends Component <{}, MessagesState> {

    constructor(props:any){
        super(props);

        this.state = {
            data: []
        }

        this.get_server_data();
    }

    async get_server_data(){
        const responce:any = await new Fetcher().get('api/threads/messages/5e1a1c818ec2f49ab3e59ab2?sort=desc', 'access')
            .then(response => { return response });
        if(responce.status > 199 && responce.status < 400){
            this.setState({
                data: responce.data
            })
        }
    }

    field(value: AllThreadStructure, index: number, array:Array<AllThreadStructure>){
        let direction_class:string = "";
        
        if(index < array.length - 1){
            if(array[index]._id === array[index + 1]._id){
                direction_class = "_left"
            }
        }
        else direction_class = "_right";
        
        return(
            <li key = { value._id } className = { "main_content__list__item" + direction_class + "box_shadow-indent" }>
                <article className = "main_content__item__wrapper">
                    <div className = { "main_content__flex_container" + direction_class + " main_content__flex_container box_shadow-rounded main_content__list__item-width_fit" }>
                        <div className="main_contnet__wrapper">
                            <span className = "main_content__item__photo">
                                <FontAwesomeIcon
                                    icon = { faUserCircle }
                                    size = "2x"
                                    className = "main_content__item__img_tag"
                                />
                            </span>
                        </div>
                        <div className="main_contnet__wrapper">
                            <span className = "main_content__item__subheader color_base">{ value.body }</span>
                        </div>
                    </div>
                    <div className = { "main_content__list__item" + direction_class + " main_content__item__flex_block"}>
                        <span className="main_content__item__base text_small color_secondary">{ moment(value.created_at).fromNow() }</span>
                    </div>
                </article>
            </li>
        )
    }

    render(){
        if(this.state.data.length){
            return (
                <article className = "main_content__item">
                    <ul className = "main_content__list__item">
                        { this.state.data.map((value, index:number, array) => {
                            return this.field(value, index, array)
                        }) }
                    </ul>
                    <SendMessageComponent/>
                </article>
            )
        }else{
            return (
                <div></div>
            )
        }
    }
}
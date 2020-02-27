import React, { Component } from 'react';
import Fetcher from '../../../Fetcher';
import { UsersStructure } from '../types';

type CurrentUserState = {
    data: UsersStructure
}

export default class CurrentUser extends Component <{}, CurrentUserState> {

    constructor(props: UsersStructure){
        super(props);

        this.state = {
            data: {
                _id: "",
                name: "",
                email: "",
                position: "",
                phone: "",
                organization: "",
                address: "",
                description: ""
            }
        }
        this.get_current_user();
    }

    async get_current_user(){
        const current_user_response: any = await new Fetcher().get(`api/users/${localStorage.getItem("user_id")}`, 'access')
        .then(response => { return response })
        if(current_user_response.status > 199 && current_user_response.status < 400){
            this.setState({
                data: current_user_response.data
            })
        }
    }

    generateArticle(value:UsersStructure){
        value.description = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque neque quae laudantium amet dolores repellat libero perspiciatis dolor optio doloribus! Error molestias eos sapiente rem exercitationem ad ipsum fugiat perferendis.";
        return (
            <div className = "main_content__item">
                <div className="main_content__item__wrapper">
                    <div className="main_content__item__photo">
                        <img src="https://s.yimg.com/ny/api/res/1.2/wtzeNGYJlWn1YCuOXKy3DQ--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/69212554e5b1b94435cb5d1f9f0d2fbd" alt="user logo" className="main_content__item__img_tag-large"/>
                    </div>
                    <div className="main_content__item__wrapper_center">
                        <p className="main_content__item__header">{ value.name }</p>
                        <p className="main_content__item__subheader">{ value.position }</p>
                        <p className = "main_content__item__base color_secondary">{ value.description }</p>
                    </div>
                    <div className="main_content__item__wrapper_center">
                        <div>
                            <p className="main_content__item__label">Email</p>
                            <p className="main_content__item__base">{ value.email }</p>
                        </div>
                        <div>
                            <p className="main_content__item__label">Phone</p>
                            <p className="main_content__item__base">{ value.phone }</p>
                        </div>
                        <div>
                            <p className="main_content__item__label">Address</p>
                            <p className="main_content__item__base">{ value.address }</p>
                        </div>
                        <div>
                            <p className="main_content__item__label">Organization</p>
                            <p className="main_content__item__base">{ value.organization }</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        if(this.state.data._id){
            return (
                this.generateArticle(this.state.data)
            )
        }else{
            return (
                <div></div>
            )
        }
    }
}
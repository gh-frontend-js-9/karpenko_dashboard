import React, { Component } from 'react';

import {Header, SideBar} from './dashboard/universal_templates';
import Project from './dashboard/projects/projects';
import Messager from './dashboard/messager/messager';
import { Redirect } from 'react-router-dom';

export enum Pages {
    "PROJECTS" = "projects",
    "MESSAGES" = "messages",
    "HOME" = "home",
    "STATISTICS" = "statistics",
    "USERS" = "users"
}
export type DashboardState = {
    page: Pages
}

export default class Dashboard extends Component <{}, DashboardState> {
    constructor(props: object){
        super(props);
        
        localStorage.setItem("dashboard_page", Pages.PROJECTS)

        this.state = {
            page: Pages.MESSAGES
        }
    }

    componentWillUpdate(){
        this.render();
    }
    
    redirectToHome(){
        return <Redirect to = "/"/>
    }

    Content(){
        switch(this.state.page){
            case Pages.MESSAGES:
                return [
                    <Header/>,
                    <div className="main_content__wrapper">
                        <SideBar/>
                        <main className = "main_content">
                            <Messager key = { Pages.MESSAGES }/>
                        </main>
                    </div>
                ]
            case Pages.PROJECTS:
                return [
                    <Header/>,
                    <div className="main_content__wrapper">
                        <SideBar/>
                        <main className = "main_content">
                            <Project key = { Pages.PROJECTS }/>
                        </main>
                    </div>
                ]
        }
    }

    render(){
        let user_id = localStorage.getItem("user_id");
        if(!user_id){
            return this.redirectToHome();
        }else{
            return this.Content();
        }
    }
}
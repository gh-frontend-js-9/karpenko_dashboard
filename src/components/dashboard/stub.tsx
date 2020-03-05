import React, { Component } from 'react';
import { Header, SideBar } from './universal_templates/frame/universal_templates';


export default class Stub extends Component {
    render(){
        return [
            <Header/>,
            <div className="main_content__wrapper">
                <SideBar/>
                <main className="main_content">
                    {/* TODO */}
                </main>
            </div>
        ]
    }
}
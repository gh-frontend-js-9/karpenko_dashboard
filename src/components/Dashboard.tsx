import React, {Component} from 'react';
// 
import {ProjectsHeader} from './dashboard/headers';
import {Header, SideBar} from './dashboard/universal_templates';
// 
import {Table} from './dashboard/projects/table';

export default class Dashboard extends Component{
    _render_universal_templates(){
        return [
            <Header/>
        ]
    }

    render(){
        return[
            this._render_universal_templates(),
            <div className="main_content__wrapper">
                <SideBar/>
                <main className = "main_content">
                    <ProjectsHeader/>
                    <section className="main_content__section">
                        <Table/>
                    </section>
                </main>
            </div>
        ]
    }
}
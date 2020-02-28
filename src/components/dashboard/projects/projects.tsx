import React, { Component } from 'react';
import Fetcher from '../../Fetcher';
import Action from '../../redux/actions';
import Preloader from '../preloader';
import { ProjectsHeader } from '../headers/headers';
import { Table } from './table';
import { Header, SideBar } from '../universal_templates';

type ProjectState = {
    projectsAmount: number,
    table: Array<any>
}

export default class ProjectComponent extends Component <{}, ProjectState> {
    constructor(props: any){
        super(props);
        this.get_projects_data();
        this.state = {
            projectsAmount: 0,
            table: [],
        }
    }

    async get_projects_data(){
        const response: any = await new Fetcher().get(`api/projects`, 'access')
            .then(response => { return response })

        if(response.status > 199 && response.status < 400){
            Object.keys(response.data).map((key) => response.data[key]);
            this.setState({ 
                projectsAmount: response.data.length,
                table: response.data
            })
            new Action().add({
                projectsAmount: response.data.length
            })
        }
        else{
            alert("Error loading data from server")
        }
    }

    projectsComponent(){
        return [
            <ProjectsHeader amount = {this.state.projectsAmount}/>,
            <section className="main_content__section">
                <Table data = { this.state.table }/>
            </section>
        ]
    }

    render(){
        if(this.state.table.length){
            return [
                <Header/>,
                <div className="main_content__wrapper">
                    <SideBar/>
                    <main className="main_content">
                        <ProjectsHeader amount = {this.state.projectsAmount}/>
                        <section className="main_content__section">
                            <Table data = { this.state.table }/>
                        </section>
                    </main>
                </div>
            ]
        }else{
            return <Preloader/>
        }
    }
}
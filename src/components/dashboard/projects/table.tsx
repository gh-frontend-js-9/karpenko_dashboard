import React, {Component} from 'react';
import Fetcher from '../../Fetcher/index';
import {FetchConfig} from '../../Fetcher/config';
import typy from 'typy';
import moment from 'moment';
import Menu from './modal_menu';

export interface ServerResponse {
    data: []
}

// string
// type AssignedVariableType <T> = {
//     position: T,
//     description: T,
//     phone: T,
//     address: T,
//     organization: T,
//     name: T,
//     email: T
// }

type TableStructure = {
    title: string,
    company: string,
    cost: number,
    deadline: Date,
    timeSpent: number,
    progress: number,
    status: string,
    assigned: object,
    created_at: Date,
    _id: string,
    updated_at: Date
}

export class Table extends Component <{}, ServerResponse> {
    constructor(props:any){
        super(props);
        this.state = {
            data: []
        }
        this.update();

        document.title = "Projects"
    }

    async update(){
        await this.get_server_data();
    }

    table_field(value:TableStructure){
        return (
            <tr className="table__row" key = {value._id} id={ value._id }>
                <td className="table__data">
                    <p className = "table__color_main">{ value.title }</p>
                    <p className = "table__color_secondary">{ value.company }</p>
                </td>
                <td className="table__data table__color_main" >{ value.cost }</td>
                <td className="table__data table__color_main">
                    <p>
                        <span>{ new Date(value.deadline).getDate() } </span>
                        <span>{ this.humanityMonthName(new Date(value.deadline).getMonth()) } </span>
                        <span>{ new Date(value.deadline).getFullYear() }</span>
                    </p>
                    <p className = "table__color_secondary"> {moment(value.updated_at).fromNow(true)} </p>
                </td>
                <td className="table__data table__color_main">{ value.timeSpent } hours</td>
                <td className="table__data">
                    <span className = "table__color_main">{ value.progress }% </span>
                    {this.generateProgress(value)}
                </td>
                <td className="table__data table__color_main">{ value.status }</td>
                <td className="table__data table__img_block">
                    <span className = "table__img_block table__element">
                        <img src="https://i.pinimg.com/originals/97/e4/2a/97e42a82fc7911961d3ca55f54d1372c.jpg" className="table__img_block__img" alt="user avatar"/>
                    </span>
                    <span className = "table__color_main">
                        {typy(value.assigned, 'name').safeObject}  <br/>
                        {typy(value.assigned, 'position').safeObject}
                    </span>
                </td>
                <td className = "modal_toggler">
                    <Menu id = {value._id}/>
                </td>
            </tr>
        )
    }

    humanityMonthName(month_number:number){
        let month_name: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return month_name.filter((value, index) => {
            return index === month_number
        })
    } 

    async get_server_data(){
        const response: any = await new Fetcher().get(`https://${FetchConfig.domain}/api/projects`, 'access')
            .then(response => { return response })

        if(response.status > 199 && response.status < 400){
            Object.keys(response.data).map((key) => response.data[key]);
            this.setState({ 
                data: response.data
            })
        }
        else{
            alert("Error loading data from server")
        }
    }

    generateProgress(data:TableStructure){
        if(data.progress < 100){
            return (
                <progress className = "progress progress_pending" max = "100" value={ data.progress }></progress>
            )
        }else{
            return (
                <progress className = "progress progress_success" max = "100" value={ data.progress }></progress>
            )
        }
    }

    render(){
        return (
            <table className="table">
                <thead className="table__header">
                    <tr className = "table__color_secondary">
                        <th>Project title</th>
                        <th>Value</th>
                        <th>Deadline</th>
                        <th>Time spent</th>
                        <th>Progress</th>
                        <th>Status</th>
                        <th>Assigned to</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {
                        this.state.data.map((value: TableStructure, index: number) => 
                            { return this.table_field(value)}
                        )
                    }
                </tbody>
            </table>
        )
    }
}
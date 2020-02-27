import React, {Component} from 'react';
// import Fetcher from '../../Fetcher/index';
// import {FetchConfig} from '../../Fetcher/config';
import typy from 'typy';
import moment from 'moment';
import Menu from './modal/modal_menu';

export interface ServerResponse {
    data: Array<any>
}

type TableProps = {
    data: Array<any>
}

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

export class Table extends Component <TableProps, ServerResponse> {
    constructor(props:any){
        super(props);
        this.state = {
            data: this.props.data
        }

        document.title = "Projects"
    }

    sort(field: string){
        switch(field){
            case "title":
                return this.state.data.sort((a:TableStructure, b:TableStructure) => {
                    return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : a.title.toLowerCase()  ? 1 : 0;
                });
                break;
            case "value":
                return this.state.data.sort((a:TableStructure, b:TableStructure) => {
                    return a.cost - b.cost
                });
            case "deadline":
                return this.state.data.sort((a:TableStructure, b:TableStructure) => {
                    return a.deadline < b.deadline ? -1 : a.title.toLowerCase()  ? 1 : 0;
                });
            case "time":
                return this.state.data.sort((a:TableStructure, b:TableStructure) => {
                    return a.timeSpent - b.timeSpent
                });
            case "progress":
                return this.state.data.sort((a:TableStructure, b:TableStructure) => {
                    return a.progress - b.progress
                });
            case "status":
                return this.state.data.sort((a:TableStructure, b:TableStructure) => {
                    return a.status.toLowerCase() < b.status.toLowerCase() ? -1 : a.title.toLowerCase()  ? 1 : 0;
                });
        }
    }

    table_field(value:TableStructure, id: number){
        let row_class:string = "";
        let main_color:string = "";
        let secondary_color:string = "";

        if(value.progress === 100){
            row_class = "table__row_success";
            main_color = "table__color_main_success";
            secondary_color = "table__color_secondary_success";
        }
        else if (value.progress < 100 && value.progress > 0) {
            row_class = "table__row_in-progress";
            main_color = "table__color_main_in-progress";
            secondary_color = "table__color_secondary_in-progess";
        }
        else{
            row_class = "table__row"
            main_color = "table__color_main";
            secondary_color = "table__color_secondary";
        }

        return (
            <tr className={row_class} key = { id } id ={ value._id }>
                <td className="table__data">
                    <p className = {main_color}>{ value.title }</p>
                    <p className = {secondary_color}>{ value.company }</p>
                </td>
                <td className={main_color + " table__data"} >{ value.cost }</td>
                <td className = {main_color + " table__data"}>
                    <p className = {main_color}>
                        <span>{ new Date(value.deadline).getDate() } </span>
                        <span>{ this.humanityMonthName(new Date(value.deadline).getMonth()) } </span>
                        <span className = {secondary_color}>{ new Date(value.deadline).getFullYear() }</span>
                    </p>
                    <p className = {main_color}> {moment(value.updated_at).fromNow(true)} </p>
                </td>
                <td className={main_color + " table__data"}>{ value.timeSpent } hours</td>
                <td className={main_color + " table__data"}>
                    <span>{ value.progress }% </span>
                    {this.generateProgress(value)}
                </td>
                <td className={main_color + " table__data"}>{ value.status }</td>
                <td className={main_color + " table__data table__img_block"}>
                    <span className = "table__img_block table__element">
                        <img src="https://i.pinimg.com/originals/97/e4/2a/97e42a82fc7911961d3ca55f54d1372c.jpg" className="table__img_block__img" alt="user avatar"/>
                    </span>
                    <span>
                        {typy(value.assigned, 'name').safeObject}  <br/>
                        {typy(value.assigned, 'position').safeObject}
                    </span>
                </td>
                <td className = {main_color + " modal_toggler"}>
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
                <thead className="table__header" key = "thead">
                    <tr className = "table__color_secondary">
                        <th className = "table__header__item"
                            onClick = {() => {
                                this.sort("title");
                            }}
                        >Project title</th>
                        <th className = "table__header__item">Value</th>
                        <th className = "table__header__item">Deadline</th>
                        <th className = "table__header__item">Time spent</th>
                        <th className = "table__header__item">Progress</th>
                        <th className = "table__header__item">Status</th>
                        <th className = "table__header__item">Assigned to</th>
                    </tr>
                </thead>
                <tbody className="table__body" key = "tbody">
                    {
                        this.state.data.map((value: TableStructure, index: number) => 
                            { return this.table_field(value, index)}
                        )
                    }
                </tbody>
            </table>
        )
    }
}
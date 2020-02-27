import React, {Component} from 'react';
import { ProjectType, MessageType } from './types';
// import store from '../redux/store';

export class ProjectsHeader extends Component <ProjectType, ProjectType> {
    constructor(props:any){
        super(props);
        this.state = {
            amount: this.props.amount
        }
    }

    render(){
        return (
            <header className="main_content__header">
                <div className="main_content__group">
                    <span className="main_content__group__item">All Projects ({this.state.amount})</span>
                    <span className="main_content__group__item">Workflow</span>
                </div>
                <div className="main_content__group">
                    <span className="main_content__group__item main_content__group__item-white">Show projects:</span>
                    <select name="projects" id="projects" className="main_content__header__select">
                        <option value="all" className="main_content__messages__header__option">All</option>
                    </select>
                </div>
            </header>
        )
    }
}

export class MessagesHeader extends Component <MessageType<number>, MessageType<number>> {
    constructor(props: MessageType<number>){
        super(props);
        this.state = {
            inbox: this.props.inbox
        }
    }
    render(){
        return (
            <header className="main_content__header">
            <div className="main_content__group">
                <span className="main_content__group__item">
                    <i className="main_content__header__icon fas fa-inbox"></i>
                    <i>Inbox({this.state.inbox})</i>
                </span>
                <span className="main_content__group__item">
                    <i className="main_content__header__icon fab fa-telegram-plane"></i>
                    <i>Sent</i>
                </span>
                <span className="main_content__group__item">
                    <i className="main_content__header__icon fas fa-trash"></i>
                    <i>Trash</i>
                </span>
            </div>
            <div className="main_content__group">
                <span className="main_content__group__item main_content__group__item-white">Show projects:</span>
                <select className="main_content__header__select">
                    <option value="all" defaultValue="all" className="main_content__messages__header__option">All</option>
                </select>
            </div>
        </header>
        )
    }
}
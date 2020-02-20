import React, {Component} from 'react';

type ProjectsState = {
    amount: number
}
type ProjectsProps = {
    amaunt: number
}

export class ProjectsHeader extends Component < {}, ProjectsState, ProjectsProps > {
    constructor(props:any){
        super(props);
        this.state = {
            amount: 0
        }
    }
    componentDidMount(){
        this.setState({amount: 56})
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

export class MessagesHeader extends Component {
    render(){
        return (
            <header className="main_content__header">
            <div className="main_content__group">
                <span className="main_content__group__item">
                    <i className="main_content__header__icon fas fa-inbox"></i>
                    <i>Inbox</i>
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
                    <option selected value="all" className="main_content__messages__header__option">All</option>
                </select>
            </div>
        </header>
        )
    }
}
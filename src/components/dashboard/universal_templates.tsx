import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faBell, faChevronDown, faPlus, faHome, faBars, faChartLine, faEnvelope, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { Pages, DashboardState } from '../Dashboard';

// Dashboard header
export class Header extends Component{

    render(){
        const base_class:string = "bar-top__user_bar__item";
        return (
            <header className = "bar-top">
                <div className = "bar-top__logo">virtus</div>
                <button className="bar-top__menu_toggler">Menu</button>
                <div className="bar-top__user_bar">
                    <span className={base_class + " bar-top__user_bar__add_block"}>
                        <span>Add</span>
                        <FontAwesomeIcon
                            icon = {faPlus}
                            className = {base_class}
                        />
                    </span>
                    <FontAwesomeIcon
                        icon = {faSearch}
                        className = {base_class}
                    />
                    <FontAwesomeIcon
                        icon = {faBell}
                        className = {base_class}
                    />
                    <span className = {base_class}>
                        <img src="https://s.yimg.com/ny/api/res/1.2/wtzeNGYJlWn1YCuOXKy3DQ--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/69212554e5b1b94435cb5d1f9f0d2fbd" alt="user avatar" className="bar-top__user_bar__avatar"/>
                        <FontAwesomeIcon
                            icon = {faChevronDown}
                            className = {base_class}
                        />
                    </span>
                </div>
            </header>
        )
    }
}

// Dashboard side nav-menu
export class SideBar extends Component {

    list_item(icon:any, page:Pages, link:string){
        return (
            <li className = "bar-side__item" key =  { page }>
                <Link to = { link }
                    className = "bar-side__item"
                >
                    <FontAwesomeIcon
                        icon = { icon }
                    />
                </Link>
            </li> 
        )
    }
    render(){
        let menu:Array<any> = [faHome, faBars, faChartLine, faEnvelope, faUserFriends];
        let id:any[] = [Pages.HOME, Pages.PROJECTS, Pages.STATISTICS, Pages.MESSAGES, Pages.USERS];

        const dasboard_link_prefix:string = "/dashboard";
        let links:Array<string> = [
            dasboard_link_prefix + "",
            dasboard_link_prefix + "/projects",
            dasboard_link_prefix + "",
            dasboard_link_prefix + "/messager",
            dasboard_link_prefix + ""
        ]
        
        return (
            <aside className="bar-side">
                <ul className="bar-side__list_wrapper">
                    {
                        menu.map((value,index) => {
                           return this.list_item(value, id[index], links[index]);
                        })
                    }
                </ul>
            </aside>
        )
    }
}
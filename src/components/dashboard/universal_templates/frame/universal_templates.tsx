import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faBell, faPlus, faHome, faBars, faChartLine, faEnvelope, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import LogoutModalWindow from './logout_modal_component';


export const base_class:string = "bar-top__user_bar__item";
// Dashboard header
export class Header extends Component{

    render(){
        
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
                        {/* Logout */}
                        <LogoutModalWindow/>
                    </span>
                </div>
            </header>
        )
    }
}

// Dashboard side nav-menu
export class SideBar extends Component {

    list_item(icon:any, page:string, link:string){
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
        let id:any[] = ["HOME", "PROJECTS", "STATISTICS", "MESSAGES", "USERS"];

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
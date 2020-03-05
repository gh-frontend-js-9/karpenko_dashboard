import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";

export default class Preloader extends Component {
    render(){
        return (
            <div className = "loader loader_centered loader_animated">
                <FontAwesomeIcon
                    icon = {faSpinner}
                    className = "loader_icon "   
                />
            </div>
        )
    }
}
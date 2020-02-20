import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import ProjectModalButton from './project_properties_modal';
import Fetcher from '../../Fetcher/index';
import {FetchConfig} from '../../Fetcher/config';

class MenuContent extends Component <HoverProps, {}>{

    removeElement = () => {
        let id:string = this.props.id;
        new Fetcher().delete(`https:${FetchConfig.domain}/api/projects/${id}`, 'no_token')
            .then(response => {
                if(response.status > 199 && response.status < 400){
                    alert("Successfully remove element")
                }
            })
            .catch(error => {
                alert(error)
            })
    }
    render(){
        return (
            <div>
                <ProjectModalButton/>
                <FontAwesomeIcon
                    icon = {faTimes}
                    className = "table__color_secondary table__icon __close_btn"
                />
            </div>
        )
    }
}

type HoverState = {
    hover: boolean,
    id: string
}
type HoverProps = {
    id: string
}

export default class HoverMenu extends Component <HoverProps, HoverState> {
    constructor(props: any) {
        super(props);

        this.state = {
            hover: false,
            id: this.props.id
        }
    }
    onHover = () => {
        this.setState({ hover: true })
    }

    onLeave = () => {
        this.setState({ hover: false })
    }

    render() {
        const {hover, id} = this.state;
        // 
        return (         
            <div onMouseLeave = { this.onLeave } >
                {hover ?
                    (<MenuContent id= {id}/>) : (
                        <FontAwesomeIcon
                            onMouseEnter = { this.onHover }
                            icon = {faEllipsisV}
                            className = "table__color_secondary table__icon __close_btn"
                        />
                    )
                }
            </div>
        )
    }
}
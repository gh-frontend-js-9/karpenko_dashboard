import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import EditModalButton from './edit_component';
import { AddModalWindow } from './add_component';
import Fetcher from '../../../Fetcher/index';

type HoverState = {
    hover: boolean,
    id: string
}
type HoverProps = {
    id: string
}

class ModalMenu extends Component <HoverProps, {}>{

    removeElement = () => {
        let id:string = this.props.id;
        new Fetcher().delete(`api/projects/${id}`, 'no_token')
            .then(response => {
                if(response.status > 199 && response.status < 400){
                    alert("Successfully remove element");
                }
            })
            .catch(error => {
                alert(error);
            })
    }
    render(){
        return (
            <div>
                <AddModalWindow/>
                <EditModalButton id = { this.props.id }/>
                <div className = "table__data-center">
                    <FontAwesomeIcon
                        onClick = { this.removeElement }
                        icon = {faTimes}
                        className = "table__color_main_success table__icon table__icon_danger __close_btn"
                    />
                </div>
            </div>
        )
    }
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
                    (<ModalMenu id= { id }/>) : (
                        <FontAwesomeIcon
                            onMouseEnter = { this.onHover }
                            icon = { faEllipsisV }
                            className = "table__color_main_success table__icon __close_btn"
                        />
                    )
                }
            </div>
        )
    }
}
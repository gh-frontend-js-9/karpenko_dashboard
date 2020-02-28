import React, { Component } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from 'react-responsive-modal';

import Fetcher from '../../../Fetcher/index';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Add project
export type ProjectState = {
    title: string,
    company: string,
    cost: number,
    deadline: Date,
    assigned: string,
    open: boolean,
}

export class AddModalWindow extends Component <{}, ProjectState>{
    constructor(props:any){
      super(props);

      this.state = {
        open: false,
        title: "",
        company: "",
        cost: 0,
        deadline: new Date(),
        assigned: ""
      }

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };
    
    handleChange(event: { target: HTMLInputElement }){
      switch(event.target.name){
        case "title": {
          this.setState({
            title: event.target.value
          })
          break;
        }
        case "company":{
          this.setState({
            company: event.target.value
          });
          break;
        }
        case "cost":{
          this.setState({
            cost: +event.target.value
          });
          break;
        }
        case "deadline":{
          this.setState({
            deadline: new Date(event.target.value)
          });
          break;
        }
      }
    }

    handleSubmit(event: React.FormEvent){
      event.preventDefault();

      let user_id = localStorage.getItem("user_id");
      new Fetcher().post(`api/projects`, 'no_token', {
        title: this.state.title,
        company: this.state.company,
        cost: `$${this.state.cost}`,
        deadline: this.state.deadline,
        assigned: user_id
      })
      
    }


    onCloseModal = () => {
      this.setState({ open: false });
    };

    render() {
      const { open } = this.state;
      if(!this.state) return(
        <div></div>
      )
      return (
        <div className = "modal-window">
          <FontAwesomeIcon
            icon = {faPlus}
              className = "table__color_main_success table__icon __close_btn"
              onClick = { this.onOpenModal }
          />
          <Modal open={ open } onClose={ this.onCloseModal } center>
            <div className="modal-window__flex-container">
              <form className = "modal-window__form_rounded-dark">
                <input type="text" className = "input__element input__element_wide" name = "title" placeholder = "Title" 
                  onChange = { this.handleChange }
                />
                <input type="text" className = "input__element input__element_wide" name = "company" placeholder = "Company"
                  onChange = { this.handleChange }
                />
                <input type="text" className = "input__element input__element_wide" name = "cost" placeholder = "Cost"
                  onChange = { this.handleChange }
                />
                <input type="date" className = "input__element input__element_wide" name = "deadline" placeholder = "Deadline"
                  onChange = { this.handleChange }
                />
                <button type="submit" className = "input__element input__element_wide"
                  onClick = { this.handleSubmit }
                >Add Project</button>
              </form>
            </div>
          </Modal>
        </div>
    );
  }
}
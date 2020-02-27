import React, { Component } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from 'react-responsive-modal';

import Fetcher from '../../../Fetcher/index';
import {FetchConfig} from '../../../Fetcher/config';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Add project
export type ProjectState = {
    title: string,
    company: string,
    cost: number,
    deadline: Date,
    assigned: string
}

export class AddModalWindow extends Component {
    state = {
      open: false
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };
     
    onCloseModal = () => {
      this.setState({ open: false });
    };

    editRequest = (id: string, data: ProjectState) => {
      new Fetcher().post(`https://${FetchConfig.domain}/api/project/${id}`, 'no_token', data)
    }     
    render() {
      const { open } = this.state;
      return (
        <div className = "modal-window">
          <FontAwesomeIcon
            icon = {faPlus}
              className = "table__color_main_success table__icon __close_btn"
              onClick = {this.onOpenModal}
          />
          <Modal open={open} onClose={this.onCloseModal} center>
            <div className="modal-window__flex-container">
              <form action="" className = "modal-window__form">
                <input type="text" className = "modal-window__form__input" placeholder="Field" />
                <input type="text" className = "modal-window__form__input" name = "title" placeholder="New Value" />
                <input type="text" className = "modal-window__form__input" name = "company" placeholder="Field" />
                <input type="text" className = "modal-window__form__input" name = "cost" placeholder="New Value" />
                <input type="date" className = "modal-window__form__input" name = "deadline" placeholder="Field" />
                <input type="text" className = "modal-window__form__input" name="assigned" placeholder="New Value" />
                <button type="submit" className = "modal-window__form__button">Add Project</button>
              </form>
            </div>
          </Modal>
        </div>
    );
  }
}
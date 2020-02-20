import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
// import MenuHoverComponent from './modal_menu';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
// 
import Fetcher from '../../Fetcher/index';
import {FetchConfig} from '../../Fetcher/config';

export default class ProjectModalWindow extends Component {
    state = {
      open: false
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };
     
    onCloseModal = () => {
      this.setState({ open: false });
    };

    editRequest = (id: string, data: any) => {
      new Fetcher().put(`https://${FetchConfig.domain}/api/project/${id}`, 'no_token', data)
    }     
    render() {
      const { open } = this.state;
      return (
        <div className = "modal-window">
          <FontAwesomeIcon
            icon = {faEdit}
              className = "table__color_secondary table__icon __close_btn"
              onClick = {this.onOpenModal}
          />
          <Modal open={open} onClose={this.onCloseModal} center>
            <div className="modal-window__flex-container">
              <form action="">
                <input type="text" placeholder="Field" />
                <input type="text" name="" id="" placeholder="New Value" />
                <button type="submit">Submit</button>
              </form>
            </div>
          </Modal>
        </div>
    );
  }
}
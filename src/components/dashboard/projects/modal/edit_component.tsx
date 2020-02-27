import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
// 
import Fetcher from '../../../Fetcher/index';
import {FetchConfig} from '../../../Fetcher/config';

export default class EditModalWindow extends Component {
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
            icon = { faEdit }
              className = "table__color_main_success table__icon __close_btn"
              onClick = {this.onOpenModal}
          />
          <Modal open={open} onClose={this.onCloseModal} center>
            <div className="modal-window__flex-container">
              <form action="" className = "modal-window__form">
                <input type="text" className = "modal-window__form__input" placeholder="Field" />
                <input type="text" className = "modal-window__form__input" name="" id="" placeholder="New Value" />
                <button type="submit" className = "modal-window__form__button">Submit</button>
              </form>
            </div>
          </Modal>
        </div>
    );
  }
}
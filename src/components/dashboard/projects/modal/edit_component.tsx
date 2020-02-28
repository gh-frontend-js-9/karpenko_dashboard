import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import Fetcher from '../../../Fetcher/index';

type EditProjectProps = {
  id: string
}
type EditProjectState = {
  open: boolean,
  id: string,
  title: string,
  cost: number,
  deadline: Date,
  pregress: number,
  status: string
}

export default class EditModalWindow extends Component <EditProjectProps, EditProjectState>{
    constructor(props:EditProjectProps){
      super(props);

      this.state = {
        open: false,
        id: this.props.id,
        title: "",
        cost: 0,
        deadline: new Date(),
        pregress: 0,
        status: ""
      }

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: { target: HTMLInputElement }){
      switch(event.target.name){
        case "cost":
          this.setState({
            cost: +event.target.value
          })
          break;
        case "status":
          this.setState({
            status: event.target.value
          })
          break;
      }
    }


    handleSubmit(event: React.FormEvent){
      event.preventDefault();
      // alert(this.state.id)

      new Fetcher().put(`api/projects/${this.state.id}`, 'access', {
        "cost": `$${this.state.cost}`,
        "status": this.state.status
      })
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };
     
    onCloseModal = () => {
      this.setState({ open: false });
    };

    render() {
      const { open } = this.state;
      return (
        <div className = "modal-window">
          <FontAwesomeIcon
            icon = { faEdit }
              className = "table__color_main table__icon __close_btn"
              onClick = {this.onOpenModal}
          />
          <Modal open={open} onClose={this.onCloseModal} center>
            <div className="modal-window__flex-container">
              <form action="" className = "modal-window__form_rounded-dark">
                <input type="text" name = "status" className="input__element input__element_wide"
                  placeholder = "Status"
                  onChange = { this.handleChange }
                />
                <input type="text" className = " input__element input__element_wide" name="cost" placeholder="Cost" 
                  onChange = { this.handleChange }
                />
                <button type="submit" className = "input__element input__element_wide"
                  onClick = { this.handleSubmit }
                >Submit</button>
              </form>
            </div>
          </Modal>
        </div>
    );
  }
}
import React, { Component } from "react";
import Modal from "react-modal";

class NewProjectModal extends Component {
  state = {
    name: "",
  };

  onChange = ev => {
    this.setState({
      name: ev.target.value,
    });
  };

  onCreate = () => {
    this.props.onClose(this.state.name);
  };

  getStyles = (width = 400, top = 20) => ({
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      overflowY: "auto",
      zIndex: 30,
      transform: "translate3d(0, 0, 0)",
    },
    content: {
      position: "relative",
      overflow: "hidden",
      padding: 0,
      maxWidth: width,
      top: `${top}vh`,
      bottom: 40,
      left: 0,
      right: 0,
      margin: `0 auto ${top}vh`,
      border: "none",
      borderRadius: "4px",
    },
  });

  render() {
    return (
      <Modal
        style={this.getStyles()}
        isOpen={this.props.show}
        onRequestClose={() => {
          this.props.onClose(null);
        }}>
        <div className="Modal">
          <div className="ModalTitle">Create New Project</div>
          <div className="flex-container-row">
            <label htmlFor="projectname">Name:</label>
            <div>
              <input
                id="projectname"
                type="text"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
          </div>
          <button onClick={this.onCreate}>Create</button>
        </div>
      </Modal>
    );
  }
}

export default NewProjectModal;

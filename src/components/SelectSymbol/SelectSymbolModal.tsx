import React, { Component } from "react";
import Modal from "react-modal";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import SymbolList from "./SymbolList";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import { IA_CREATE_SYMBOLREF } from "../../actions/interactionTypes";

interface IProps {
  show: boolean;
  dispatch: Function;
  symbols: GraphicSymbol[];
}

class SelectSymbolModal extends Component<IProps> {
  state = { show: true, activeSymbolId: "" };

  onClose = () => {
    this.props.dispatch(actions.showModal(""));
  };

  onClickSymbol = (symbol: GraphicSymbol) => {
    if (this.state.activeSymbolId === symbol.id) {
      console.log("exit");
      this.props.dispatch(actions.showModal(""));
      this.props.dispatch(
        actions.startInteraction(IA_CREATE_SYMBOLREF, symbol.name),
      );
    }
    this.setState({
      activeSymbolId: symbol.id,
    });
  };

  render() {
    const top = 20;
    const width = 600;
    const style = {
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
        bottom: 0,
        left: 0,
        right: 0,
        height: 400,
        margin: `0 auto ${top}vh`,
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#aaa",
      },
    };

    return (
      <Modal
        style={style}
        isOpen={this.props.show}
        onRequestClose={() => this.onClose()}>
        <div className="Modal">
          <div className="ModalTitle">Select Symbol</div>
          <div className="ModalContent">
            <div className="flex-container-row">
              <div className="scrolling">
                <div className="fix-width-300">
                  <SymbolList
                    symbols={this.props.symbols}
                    activeSymbolId={this.state.activeSymbolId}
                    onClickSymbol={this.onClickSymbol}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <canvas className="canvas" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    symbols: state.graphic.symbols,
  };
};

export default connect(mapStateToProps)(SelectSymbolModal);

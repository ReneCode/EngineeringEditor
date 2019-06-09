import React, { Component } from "react";
import Modal from "react-modal";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { IGlobalState } from "../../store/reducers";
import SymbolList from "./SymbolList";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import CanvasFullSize from "../CanvasFullSize";

interface IProps {
  show: boolean;
  dispatch: Function;
  symbols: GraphicSymbol[];
}

interface IState {
  show: boolean;
  activeSymbol: GraphicSymbol | null;
}

class SelectSymbolModal extends Component<IProps> {
  state: IState = { show: true, activeSymbol: null };

  constructor(props: any) {
    super(props);
    this.onDrawCanvas = this.onDrawCanvas.bind(this);
  }

  onClose = () => {
    this.props.dispatch(actions.showModal(""));
  };

  onClickSymbol = (symbol: GraphicSymbol) => {
    // const name = symbol.name;
    if (symbol && symbol === this.state.activeSymbol) {
      this.props.dispatch(actions.showModal(""));
      // this.props.dispatch(
      // actions.startInteraction(IA_CREATE_SYMBOLREF, name),
      // );
    }
    this.setState({
      activeSymbol: symbol,
    });
  };
  onDrawCanvas = (
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
  ) => {
    /*
      const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, width, height);

      if (this.state.activeSymbol) {
        let box = this.state.activeSymbol.getBoundingBox();

        // 10% margin on each side
        const dx = box.width() * 0.1;
        const dy = box.height() * 0.1;
        const viewport: IViewport = {
          x: box.x() - dx,
          y: box.y() - dy,
          width: box.width() + 2 * dx,
          height: box.height() + 2 * dy,
        };

        const transform = new TransformCoordinate(viewport, {
          width,
          height,
        });
        if (this.state.activeSymbol) {
          this.state.activeSymbol.draw(context, transform);
        }
      }
    }
    */
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
              <div className="scrolling fix-width-300">
                <SymbolList
                  symbols={this.props.symbols}
                  activeSymbol={this.state.activeSymbol}
                  onClickSymbol={this.onClickSymbol}
                />
              </div>
              <CanvasFullSize>{this.onDrawCanvas}</CanvasFullSize>
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

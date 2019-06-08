import React from "react";
import { connect } from "react-redux";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import {
  createElementAction,
  cudElementAction,
} from "../../actions/changeElementActions";
import GraphicSymbolRef from "../../model/graphic/GraphicSymbolRef";
import { IGlobalState } from "../../store/reducers";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";

interface IProps {
  symbols: GraphicSymbol[];
  dispatch: Function;
}

class IacCreateSymbolRef extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  private symbolRef: GraphicSymbolRef | null = null;

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseUp", this.onMouseUp),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDrag", this.onMouseDrag),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDown", this.onMouseDown),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
    const symbolName = "Symbol-24";
    const symbol = this.props.symbols.find(
      s => s.name === symbolName,
    );
    if (!symbol) {
      throw new Error("symbol not found:" + symbolName);
    }
    console.log(symbol);

    const point = event.point;
    // const paperSymbol = symbol.getPaperSymbol();

    const symbolRef = new GraphicSymbolRef(symbolName, point);
    this.props.dispatch(
      cudElementAction("placement", { create: [symbolRef] }),
    );
    // const placedSymbol = paperSymbol.place(point);

    // this.symbolRef = new GraphicSymbolRef(symbolName, point, symbol);
  };

  onMouseUp = () => {};

  onMouseDrag = () => {};

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    symbols: state.graphic.symbols,
  };
};

export default connect(mapStateToProps)(IacCreateSymbolRef);

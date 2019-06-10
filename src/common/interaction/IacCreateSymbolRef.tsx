import React from "react";
import { connect } from "react-redux";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import { cudElementAction } from "../../actions/changeElementActions";
import GraphicSymbolRef from "../../model/graphic/GraphicSymbolRef";
import { IGlobalState } from "../../store/reducers";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";

interface IProps {
  symbols: GraphicSymbol[];
  symbolName: string;
  dispatch: Function;
}

class IacCreateSymbolRef extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  private item: Paper.Item = new Paper.Item();
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
    this.createSymbolRef(event.point);
  };

  onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
    if (!this.symbolRef) {
      throw new Error("symboRef missing");
    }

    this.createSymbolRef(event.point);
    this.props.dispatch(
      cudElementAction("placement", this.symbolRef),
    );
    this.symbolRef = null;
  };

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    this.createSymbolRef(event.point);
  };

  private createSymbolRef(pt: Paper.Point) {
    if (!this.symbolRef) {
      const symbolName = this.props.symbolName;
      const symbol = this.props.symbols.find(
        s => s.name === symbolName,
      );
      if (!symbol) {
        throw new Error("symbol not found:" + symbolName);
      }
      const point = pt;
      this.symbolRef = new GraphicSymbolRef(symbolName, point);
      this.symbolRef.setSymbol(symbol);
      this.item = this.symbolRef.paperDraw();
    } else {
      this.symbolRef.setPoint(pt);
      this.item.remove();
      this.item = this.symbolRef.paperDraw();
    }
  }

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

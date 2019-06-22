import React from "react";
import { connect } from "react-redux";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { cudElementAction } from "../../actions/changeElementActions";
import GraphicSymbolRef from "../../model/graphic/GraphicSymbolRef";
import { IGlobalState } from "../../store/reducers";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import SnapToGrid from "../SnapToGrid";

interface IProps {
  symbols: GraphicSymbol[];
  symbolName: string;
  dispatch: Function;
}

class IacPlaceSymbol extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  private item: Paper.Item = new Paper.Item();
  private symbolRef: GraphicSymbolRef | null = null;
  private snapToGrid = new SnapToGrid();

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
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseMove", this.onMouseMove),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
    if (this.item) {
      this.item.remove();
    }
  }

  onMouseDown = (event: Paper.MouseEvent) => {
    const pt = this.snapToGrid.snap(event.point);
    this.createSymbolRef(pt);
  };

  onMouseUp = (event: Paper.MouseEvent) => {
    if (!this.symbolRef) {
      throw new Error("symboRef missing");
    }
    const pt = this.snapToGrid.snap(event.point);

    this.createSymbolRef(pt);
    this.props.dispatch(
      cudElementAction("placement", this.symbolRef),
    );
    this.symbolRef = null;
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    const pt = this.snapToGrid.snap(event.point);
    this.createSymbolRef(pt);
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    const pt = this.snapToGrid.snap(event.point);
    this.createSymbolRef(pt);
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
      this.symbolRef.pt = pt;
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

export default connect(mapStateToProps)(IacPlaceSymbol);

import React from "react";

import { connect } from "react-redux";
import Paper, { Point } from "paper";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { cudElementAction } from "../../actions/changeElementActions";
import Placement from "../../model/Placement";
import { IGlobalState } from "../../store/reducers";
import { AppEventType } from "../Event/AppEventType";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import { createSymbolAction } from "../../actions/createSymbol";
import GraphicSymbolRef from "../../model/graphic/GraphicSymbolRef";
import ElementFactory from "../../model/ElementFactory";

interface IPayload {
  placements: Placement[];
}

interface IProps {
  symbols: GraphicSymbol[];
  dispatch: Function;
}

class IacCreateSymbolAndSymbolRef extends React.Component<IProps> {
  private unsubscribeFn: any;

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "createSymbolAndSymbolRef",
      this.onCreateSymbolAndSymbolRef,
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onCreateSymbolAndSymbolRef = (
    type: AppEventType,
    payload: IPayload,
  ) => {
    if (
      !payload ||
      !payload.placements ||
      payload.placements.length === 0
    ) {
      return;
    }

    const point = new Paper.Point(0, 0);
    const symbolName = `Symbol-${this.props.symbols.length + 1}`;
    const placements = payload.placements;
    const projectId = placements[0].projectId;
    const symbol = new GraphicSymbol(placements);
    symbol.name = symbolName;
    symbol.projectId = projectId;

    this.props.dispatch(createSymbolAction(symbol));

    const symbolRef = new GraphicSymbolRef(symbolName, point);
    // this.props.dispatch(
    //   cudElementAction("placement", symbolRef, undefined, placements),
    // );
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    symbols: state.graphic.symbols,
  };
};

export default connect(mapStateToProps)(IacCreateSymbolAndSymbolRef);

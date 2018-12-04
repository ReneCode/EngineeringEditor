import { Component } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../reducers";
import Placement from "../model/Placement";
import GraphicSymbolRef from "../model/graphic/GraphicSymbolRef";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import { symbol } from "prop-types";
import GraphicConnectionPoint, {
  ConnectionPointDirection,
} from "../model/graphic/GraphicConnectionPoint";

interface IProps {
  items: Placement[];
}

class Autoconnection extends Component<IProps> {
  componentDidUpdate() {
    const reducer = (acc: any, s: GraphicSymbol | null) => {
      if (s) {
        return acc.concat(
          s.items.filter(g => g.type === "connectionpoint"),
        );
      }
      return acc;
    };

    const connectionPoints: GraphicConnectionPoint[] = this.props.items
      .map(p => p.graphic)
      .filter(g => g.type === "symbolref")
      .map(g => (g as GraphicSymbolRef).symbol)
      .reduce(reducer, []);

    console.log("connectionPoints: ", connectionPoints);

    const len = connectionPoints.length;
    for (let i = 0; i < len; i++) {
      const dirA = connectionPoints[i].direction;
      for (let j = i + 1; j < len; j++) {
        const dirB = connectionPoints[j].direction;
      }
    }

    //   (acc, s) =>
    //     acc.concat(
    //       (s as GraphicSymbol).items.map(
    //         g => g.type === "connectionpoint",
    //       ),
    //     ),
    //   [],
    // );
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    items: state.graphic.items,
  };
};

export default connect(mapStateToProps)(Autoconnection);

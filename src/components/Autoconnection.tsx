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
import Point from "../common/point";
import { channel } from "redux-saga";

interface IProps {
  items: Placement[];
}

interface IPlacementAndConnectionPoint {
  placement: Placement;
  index: number;
  pt: Point;
  direction: ConnectionPointDirection;
}

class Autoconnection extends Component<IProps> {
  componentDidUpdate() {
    const reduceSymbolRefToCpWithSymbolRef = (
      acc: IPlacementAndConnectionPoint[],
      s: { placement: Placement; symbolRef: GraphicSymbolRef },
    ): IPlacementAndConnectionPoint[] => {
      if (s.symbolRef && s.symbolRef.symbol) {
        const symbol = s.symbolRef.symbol;
        const symbolPt = s.symbolRef.pt.sub(symbol.insertPt);
        // console.log(
        //   s.symbolRef.pt,
        //   symbol.insertPt,
        //   symbolPt,
        //   symbol.items,
        // );
        const cpsWithSymbolRef = symbol.items
          .filter(g => g.type === "connectionpoint")
          .map(g => g as GraphicConnectionPoint)
          .map((cp, index) => {
            return {
              placement: s.placement,
              index: index,
              pt: symbolPt.add(cp.pt),
              direction: cp.direction,
            };
          });
        return acc.concat(cpsWithSymbolRef);
      } else {
        return acc;
      }
    };

    const sortConnectionPoints = (
      a: IPlacementAndConnectionPoint,
      b: IPlacementAndConnectionPoint,
    ) => {
      if (
        (a.direction === ConnectionPointDirection.DOWN ||
          a.direction === ConnectionPointDirection.UP) &&
        (b.direction === ConnectionPointDirection.LEFT ||
          b.direction === ConnectionPointDirection.RIGHT)
      ) {
        return 1;
      }
      if (
        (a.direction === ConnectionPointDirection.LEFT ||
          a.direction === ConnectionPointDirection.RIGHT) &&
        (b.direction === ConnectionPointDirection.UP ||
          b.direction === ConnectionPointDirection.DOWN)
      ) {
        return -1;
      }
      // direction fits
      if (
        a.direction === ConnectionPointDirection.LEFT ||
        a.direction === ConnectionPointDirection.RIGHT
      ) {
        // left-right direction

        // 1. order by y-coordinate
        if (a.pt.y < b.pt.y) {
          return -1;
        }
        if (a.pt.y > b.pt.y) {
          return 1;
        }
        // 1.order by x-coordinate
        if (a.pt.x < b.pt.x) {
          return -1;
        } else {
          return 1;
        }
      } else {
        // UP-DOWN direction

        // 1. order by x-coordinate
        if (a.pt.x < b.pt.x) {
          return -1;
        }
        if (a.pt.x > b.pt.x) {
          return 1;
        }
        // 1.order by y-coordinate
        if (a.pt.y < b.pt.y) {
          return -1;
        } else {
          return 1;
        }
      }
      return 1;
    };

    const cps = this.props.items
      .map(p => {
        // console.log((p.graphic as GraphicSymbolRef).pt);
        return { placement: p, graphic: p.graphic };
      })
      .filter((s: any) => s.graphic.type === "symbolref")
      .map((s: any) => {
        return {
          placement: s.placement,
          symbolRef: s.graphic as GraphicSymbolRef,
        };
      })
      .reduce(reduceSymbolRefToCpWithSymbolRef, [])
      .sort(sortConnectionPoints)
      .map((s: IPlacementAndConnectionPoint) => ({
        direction: s.direction,
        pt: s.pt,
      }));

    // console.log("cps: ", JSON.stringify(cps, null, 2));

    // const len = connectionPoints.length;
    // for (let i = 0; i < len; i++) {
    //   const dirA = connectionPoints[i].direction;
    //   for (let j = i + 1; j < len; j++) {
    //     const dirB = connectionPoints[j].direction;
    //   }
    // }

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

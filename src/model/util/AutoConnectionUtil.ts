import Paper from "paper";
import Placement from "../Placement";
import GraphicConnectionPoint, {
  ConnectionPointDirection,
} from "../graphic/GraphicConnectionPoint";
import GraphicSymbolRef from "../graphic/GraphicSymbolRef";

interface IPlacementAndConnectionPoint {
  placement: Placement;
  index: number;
  pt: Paper.Point;
  direction: ConnectionPointDirection;
}

interface IPlacementAndConnectionPointPair {
  source: IPlacementAndConnectionPoint;
  dest: IPlacementAndConnectionPoint;
}

class AutoConnectionUtil {
  placements: Placement[];

  constructor(placements: Placement[]) {
    this.placements = placements;
  }

  public getConnectionPairs(): IPlacementAndConnectionPointPair[] {
    const connectionPoints = this.getSortedConnectionPoints();
    const pairs = [];
    const len = connectionPoints.length;
    let i = 0;
    while (i < len - 1) {
      const source = connectionPoints[i];
      const iDest = i + 1;
      const dest = connectionPoints[iDest];
      if (this.match(source, dest)) {
        pairs.push({
          source: connectionPoints[i],
          dest: connectionPoints[iDest],
        });
        i += 2;
      } else {
        i++;
      }
    }
    return pairs;
  }

  private match(
    source: IPlacementAndConnectionPoint,
    dest: IPlacementAndConnectionPoint,
  ): boolean {
    if (
      source.direction === ConnectionPointDirection.UP &&
      dest.direction === ConnectionPointDirection.DOWN &&
      source.pt.x === dest.pt.x
    ) {
      return true;
    }

    if (
      source.direction === ConnectionPointDirection.RIGHT &&
      dest.direction === ConnectionPointDirection.LEFT &&
      source.pt.y === dest.pt.y
    ) {
      return true;
    }
    return false;
  }

  private getSortedConnectionPoints() {
    return this.placements
      .filter((p: Placement) => p.type === "symbolref")
      .map((p: Placement) => p as GraphicSymbolRef)
      .reduce(this.reduceSymbolRefToCpWithSymbolRef, [])
      .sort(this.sortConnectionPoints);
  }

  private reduceSymbolRefToCpWithSymbolRef = (
    acc: IPlacementAndConnectionPoint[],
    symbolRef: GraphicSymbolRef,
  ): IPlacementAndConnectionPoint[] => {
    if (symbolRef) {
      const symbol = symbolRef.getSymbol();
      if (symbol) {
        const symbolPt = symbolRef.pt.subtract(symbol.insertPt);
        const cpsWithSymbolRef = symbol.placements
          .filter(g => g.type === "connectionpoint")
          .map(g => g as GraphicConnectionPoint)
          .map((cp, index) => {
            return {
              placement: symbolRef,
              index: index,
              pt: symbolPt.add(cp.pt),
              direction: cp.direction,
            };
          });
        return acc.concat(cpsWithSymbolRef);
      }
    }
    return acc;
  };
  private sortConnectionPoints = (
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
        return 1;
      }
      if (a.pt.y > b.pt.y) {
        return -1;
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
        return 1;
      } else {
        return -1;
      }
    }
  };
}

export default AutoConnectionUtil;

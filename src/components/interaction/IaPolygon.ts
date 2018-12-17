import IaBase, { IaConfig } from "./IaBase";
import GraphicBase from "../../model/graphic/GraphicPolygon";
import { IaEventType } from "./Interaction";
import * as actions from "../../actions";

class IaPolygon extends IaBase {
  constructor(config: IaConfig) {
    super(config);
  }

  start = async () => {
    try {
      let polygon = new GraphicBase();
      let run = true;
      while (run) {
        const result = await this.props.getPoint([
          IaEventType.mouseDown,
          IaEventType.mouseUp,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (!result) {
          this.props.dispatch(actions.setTempItem());
          return;
        }
        if (this.isEscape(result)) {
          run = false;
        } else {
          if (polygon.points.length === 0) {
            switch (result.type) {
              case IaEventType.mouseDown:
                polygon.points.push(result.pointWc);
                // that is the next moving point
                polygon.points.push(result.pointWc);
                break;
            }
          } else {
            // 2-th , 3-th point
            polygon.points[polygon.points.length - 1] =
              result.pointWc;
            switch (result.type) {
              case IaEventType.mouseDown:
              case IaEventType.mouseUp:
                // next moving point, but only is it's not the same as last point
                if (
                  !polygon.points[polygon.points.length - 1].equal(
                    polygon.points[polygon.points.length - 2],
                  )
                ) {
                  polygon.points.push(result.pointWc);

                  if (polygon.closed()) {
                    run = false;
                  }
                }
                break;
            }
          }
          this.props.dispatch(actions.setTempItem(polygon));
        }
      } // while (run)

      const len = polygon.points.length;
      if (len > 0) {
        polygon.points.splice(len - 1);
      }
      // remove last dynamic point
      this.props.dispatch(actions.setTempItem(polygon));
      if (polygon.points.length >= 2) {
        this.saveGraphic(polygon);
        return true; // restart
      }
    } catch (ex) {}
  };
}

export default IaPolygon;

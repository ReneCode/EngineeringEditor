import IaBase, { IaContext, IaEventType } from "./IaBase";
import GraphicPolygon from "../../model/graphic/GraphicPolygon";
import * as actions from "../../actions";

class IaPolygon extends IaBase {
  constructor(config: IaContext) {
    super(config);
  }

  start = async () => {
    try {
      let polygon = new GraphicPolygon();
      let run = true;
      while (run) {
        const result = await this.context.getEvent([
          IaEventType.mouseDown,
          IaEventType.mouseUp,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (!result) {
          this.context.dispatch(actions.setTempItem());
          return;
        }
        if (this.isEscape(result)) {
          run = false;
        }

        if (result.type === IaEventType.keyDown) {
          // TODO keyboard commands (h = horizontal,v = vertical)
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
          this.context.dispatch(actions.setTempItem(polygon));
        }
      } // while (run)

      const len = polygon.points.length;
      if (len > 0) {
        // last point it the temp-rubberband-point remove it
        polygon.points.splice(len - 1);
      }
      // remove last dynamic point
      this.context.dispatch(actions.setTempItem(polygon));
      if (polygon.points.length >= 2) {
        console.log("A");
        await this.context.dispatch(actions.createPlacement(polygon));
        console.log("B");
        this.context.dispatch(actions.setTempItem());
        console.log("C");
        return { restart: true };
      }
    } catch (ex) {}
  };
}

export default IaPolygon;

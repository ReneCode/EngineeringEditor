import IaLine from "./IaLine";
import IaPolygon from "./IaPolygon";
import IaConnectionPoint from "./IaConnectionPoint";
import IaCircle from "./IaCircle";
import IaSymbolRef from "./IaSymbolRef";
import IaZoomWindow from "./IaZoomWindow";
import IaDelete from "./IaDelete";
import { IaContext } from "./IaBase";
import IaSelect from "./IaSelect";
import IaMove from "./IaMove";

const iaMap: { [key: string]: any } = {
  IA_DELETE_ITEM: IaDelete,
  IA_CREATE_LINE: IaLine,
  IA_CREATE_CIRCLE: IaCircle,
  IA_CREATE_POLYGON: IaPolygon,
  IA_CREATE_CONNECTION_POINT: IaConnectionPoint,
  IA_CREATE_SYMBOLREF: IaSymbolRef,
  IA_ZOOM_WINDOW: IaZoomWindow,
  IA_SELECT: IaSelect,
  IA_MOVE: IaMove,
};

class InteractionStarter {
  interaction: any = undefined;

  start = async (iaConfig: IaContext, action: any) => {
    if (this.interaction && this.interaction.stop) {
      this.interaction.stop();
    }

    const type = action.payload.type;
    let iaClass = iaMap[type];
    if (iaClass) {
      this.interaction = new iaClass(iaConfig);
      const result = await this.interaction.start(
        action.payload.args,
      );
      if (result) {
        const { restart } = result;
        if (restart) {
          iaConfig.dispatch(action);
        }
      }
    } else {
      console.log("Interaction not found:", type);
    }
  };
}

export default InteractionStarter;

import IaLine from "./IaLine";
import IaPolygon from "./IaPolygon";
import IaConnectionPoint from "./IaConnectionPoint";
import IaCircle from "./IaCircle";
import IaSymbolRef from "./IaSymbolRef";
import IaZoomWindow from "./IaZoomWindow";
import IaDelete from "./IaDelete";
import { IaConfig } from "./IaBase";

const iaMap: { [key: string]: any } = {
  IA_DELETE_ITEM: IaDelete,
  IA_CREATE_LINE: IaLine,
  IA_CREATE_CIRCLE: IaCircle,
  IA_CREATE_POLYGON: IaPolygon,
  IA_CREATE_CONNECTION_POINT: IaConnectionPoint,
  IA_CREATE_SYMBOLREF: IaSymbolRef,
  IA_ZOOM_WINDOW: IaZoomWindow,
};

class InteractionStarter {
  interaction: any = undefined;

  start = async (iaConfig: IaConfig, action: any) => {
    if (this.interaction && this.interaction.stop) {
      this.interaction.stop();
    }

    const type = action.payload.type;
    let iaClass = iaMap[type];
    if (iaClass) {
      this.interaction = new iaClass(iaConfig);
      let repeat = await this.interaction.start(action.payload.args);
      if (repeat) {
        iaConfig.dispatch(action);
      }
    } else {
      console.log("Interaction not found:", type);
    }
  };
}

export default InteractionStarter;

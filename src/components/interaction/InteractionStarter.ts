import {
  IA_CREATE_LINE,
  IA_CREATE_POLYGON,
} from "../../actions/interactionTypes";
import IaLine from "./IaLine";
import IaPolygon from "./IaPolygon";
import IaConnectionPoint from "./IaConnectionPoint";

const iaMap: { [key: string]: any } = {
  IA_CREATE_LINE: IaLine,
  IA_CREATE_POLYGON: IaPolygon,
  IA_CREATE_CONNECTION_POINT: IaConnectionPoint,
};

class InteractionStarter {
  interaction: any = undefined;
  iaConfig: any;

  constructor(iaConfig: any) {
    this.iaConfig = iaConfig;
  }

  start = (action: any) => {
    if (this.interaction && this.interaction.stop) {
      this.interaction.stop();
    }
    const type = action.payload.type;
    let iaClass = iaMap[type];
    if (iaClass) {
      this.interaction = new iaClass(this.iaConfig);
      this.interaction.start();
    } else {
      console.log("Interaction not found:", type);
    }
  };
}

export default InteractionStarter;

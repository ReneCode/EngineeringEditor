import * as actions from "./../../actions";
import IaLine from "./IaLine";
import IaPolygon from "./IaPolygon";
import IaConnectionPoint from "./IaConnectionPoint";
import IaCircle from "./IaCircle";
import IaSymbolRef from "./IaSymbolRef";
import IaZoomWindow from "./IaZoomWindow";
import IaDelete from "./IaDelete";
import IaBase, { IaContext } from "./IaBase";
import IaSelect from "./IaSelect";
import IaMove from "./IaMove";
import IaCreateSymol from "./IaCreateSymbol";

const iaMap: { [key: string]: any } = {
  IA_DELETE_ITEM: IaDelete,
  IA_CREATE_LINE: IaLine,
  IA_CREATE_CIRCLE: IaCircle,
  IA_CREATE_POLYGON: IaPolygon,
  IA_CREATE_CONNECTION_POINT: IaConnectionPoint,
  IA_CREATE_SYMBOLREF: IaSymbolRef,
  IA_CREATE_SYMBOL: IaCreateSymol,
  IA_ZOOM_WINDOW: IaZoomWindow,
  IA_SELECT: IaSelect,
  IA_MOVE: IaMove,
};

class InteractionStarter {
  interaction: IaBase | undefined;

  start = async (iaConfig: IaContext, action: any) => {
    if (this.interaction && this.interaction.stop) {
      this.interaction.stop();
    }

    const type = action.payload.type;
    let iaClass = iaMap[type];
    let startIaSelect = true;
    if (iaClass) {
      this.interaction = new iaClass(iaConfig);
      // console.log("start:", type);
      if (this.interaction) {
        const result = await this.interaction.start(
          action.payload.args,
        );
        console.log("finished:", type, result);
        if (result) {
          const { restart } = result;
          if (restart) {
            iaConfig.dispatch(action);
            startIaSelect = false;
          }
        }
        if (startIaSelect) {
          // console.log("start ??");
          // iaConfig.dispatch(actions.startInteraction(IA_SELECT));
        }
      }
    } else {
      console.log("Interaction not found:", type);
    }
  };
}

export default InteractionStarter;

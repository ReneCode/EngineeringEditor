import { IGlobalState } from "../../reducers";
import * as actions from "../../actions";
import GraphicBase from "../../model/graphic/GraphicBase";

export interface IaConfig {
  getPoint: Function;
  dispatch: Function;
  state: IGlobalState;
}

class IaBase {
  props: IaConfig;

  constructor(props: IaConfig) {
    this.props = props;
  }

  start() {}
  stop() {}

  saveGraphic = async (graphic: GraphicBase) => {
    const placement = await this.props.dispatch(
      actions.addGraphicItemThunk(graphic),
    );

    this.props.dispatch(actions.setTempItem());
  };
}

export default IaBase;

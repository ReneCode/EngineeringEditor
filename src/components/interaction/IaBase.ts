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
      actions.saveGraphicItem(graphic),
    );

    this.props.dispatch(actions.setTempItem());
    this.props.dispatch(actions.addItem(placement));
  };
}

export default IaBase;

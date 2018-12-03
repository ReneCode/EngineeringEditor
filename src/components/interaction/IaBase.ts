import { IGlobalState } from "../../reducers";

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
}

export default IaBase;

import { Component } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../reducers";
import Placement from "../model/Placement";
import AutoConnectionUtil from "../model/AutoConnectionUtil";
import GraphicLine from "../model/graphic/GraphicLine";
import * as actions from "../actions";

interface IProps {
  items: Placement[];
  dispatch: Function;
}

class Autoconnection extends Component<IProps> {
  componentDidUpdate() {
    const ac = new AutoConnectionUtil(this.props.items);
    const pairs = ac.getConnectionPairs();

    const lines = pairs.map(p => {
      const line = new GraphicLine(p.source.pt, p.dest.pt);
      return line;
    });
    this.props.dispatch(actions.setTempItem(lines));
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    items: state.graphic.items,
  };
};

export default connect(mapStateToProps)(Autoconnection);

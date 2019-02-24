import { Component } from "react";
import Paper from "paper";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";

class DrawGraphic extends Component {
  componentDidMount() {
    console.log("drawGraphic");
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    graphic: state.graphic,
  };
};

export default connect(mapStateToProps)(DrawGraphic);

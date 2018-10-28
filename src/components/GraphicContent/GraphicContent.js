import React from "react";
import { connect } from "react-redux";

const GraphicContent = props => {
  console.log(props.canvas);
  this.context = props.canvas.getContext("2d");
  this.context.beginPath();

  this.context.lineWidth = 1;
  this.context.moveTo(10, 40);
  this.context.lineTo(50, 140);

  this.context.stroke();

  return null;
};

const mapStateToProps = state => {
  return {
    graphic: state.graphic,
  };
};

export default connect(mapStateToProps)(GraphicContent);

import React from "react";
// https://github.com/frenic/csstype
import * as CSS from "csstype";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { AppEventType } from "../../common/Event/AppEventType";

class TextEditView extends React.Component {
  private unsubscribeFn: any;

  public state = {
    show: false,
    text: "",
    style: {},
  };

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "showEditText",
      this.onShowEditText,
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onShowEditText = (type: AppEventType, options: any) => {
    console.log("onShowEditText:", options);
    this.setState({
      show: options.show,
      text: options.text,
      style: {
        left: options.left,
        top: options.top,
        fontSize: options.fontSize,
        fontFamily: options.fontFamily,
        color: options.color,
      },
    });
  };

  onRootMouseDown = (event: React.MouseEvent) => {
    this.setState({
      show: false,
    });
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    if (!this.state.show) {
      return null;
    }

    const style: CSS.Properties = {
      ...this.state.style,
      position: "absolute",
      border: "1px solid black",
    };

    // const rootStyle: CSS.Properties = {
    //   position: "absolute",
    //   width: "100%",
    //   height: "100%",
    //   top: 0,
    //   left: 0,
    //   backgroundColor: "#44444422",
    // };

    return (
      // <div style={rootStyle} onMouseDown={this.onRootMouseDown}>
      <div contentEditable style={style}>
        {this.state.text}
      </div>
      // </div>
    );
  }
}

export default TextEditView;

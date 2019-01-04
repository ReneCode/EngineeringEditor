import React, { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";
import {
  addEventHandlerAction,
  removeEventHandlerAction,
} from "./../../actions";
import { IaEventType } from "./../interaction/IaBase";
import Point from "./../../common/point";
import { IIaEvent } from "./../../model/types";

interface IProps {
  dispatch: Function;
  cursor: string;
}

class Statusbar extends Component<IProps> {
  state = {
    cursorPt: new Point(0, 0),
  };

  constructor(props: any) {
    super(props);

    this.eventHandler = this.eventHandler.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      addEventHandlerAction(IaEventType.mouseMove, this.eventHandler),
    );
  }

  componentWillUnmount() {
    this.props.dispatch(
      removeEventHandlerAction(
        IaEventType.mouseMove,
        this.eventHandler,
      ),
    );
  }

  eventHandler(iaEvent: IIaEvent) {
    this.setState({
      cursorPt: iaEvent.pointWc,
    });
  }

  render() {
    return (
      <div className="status">
        <div>
          {this.state.cursorPt.x} {this.state.cursorPt.y}
        </div>
      </div>
    );
  }
}

export default connect()(Statusbar);

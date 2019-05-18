import React from "react";

import Paper from "paper";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { AppEventType } from "../../common/Event/AppEventType";
import { IGlobalState } from "../../reducers";
import { connect } from "react-redux";

interface IProps {
  selectedPaperItems: Paper.Item[];
}

class Statusbar extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];

  state = {
    cursor: new Paper.Point(0, 0),
  };

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe(
        "mouseMove",
        this.mouseEventHandler,
      ),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe(
        "mouseDrag",
        this.mouseEventHandler,
      ),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  mouseEventHandler = (
    type: AppEventType,
    event: Paper.MouseEvent,
  ) => {
    const pt = new Paper.Point(
      Math.floor(event.point.x),
      Math.floor(event.point.y),
    );

    this.setState({
      cursor: pt,
    });
  };

  render() {
    return (
      <div className="status">
        <div>
          x:{this.state.cursor.x} y:{this.state.cursor.y}
        </div>
        <div>selected items:</div>
        {this.props.selectedPaperItems.map((item, idx) => {
          return (
            <div key={idx}>
              {item.id}/{item.data}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPaperItems: state.graphic.selectedPaperItems,
  };
};

export default connect(mapStateToProps)(Statusbar);

import Paper from "paper";
import React from "react";
import PaperUtil from "../../utils/PaperUtil";
import { IGlobalState } from "../../store/reducers";
import { connect } from "react-redux";

interface IProps {
  items: Paper.Item[];
  viewChanged: number;
  canvasSize: Paper.Size;
}

class FloatingToolbar extends React.Component<IProps> {
  state = {
    style: {},
  };

  componentDidMount() {
    this.updatePosition();
  }

  componentDidUpdate(prevProps: IProps) {
    if (
      prevProps.items !== this.props.items ||
      prevProps.viewChanged !== this.props.viewChanged
    ) {
      this.updatePosition();
    }
  }

  updatePosition() {
    let bbox = PaperUtil.createBoundingBox(this.props.items);
    const viewPoint = Paper.view.projectToView(bbox.topLeft);

    console.log(":", Paper.view.bounds);
    const NAV_HEIGHT = 40;
    const TOOLBAR_HEIGHT = 44;
    const gapToItem = 20;
    const gapToFrame = 10;

    // distance to canvas-edgs
    const MIN_LEFT = 70; // there is the main-toolbar on the left
    const MIN_BOTTOM = 70; // there is the zoom-toolbar on the bottom
    // const MIN_RIGHT = 10;

    const minTop = TOOLBAR_HEIGHT + gapToFrame;
    let top = viewPoint.y - TOOLBAR_HEIGHT + NAV_HEIGHT - gapToItem;

    top = Math.max(top, minTop);
    const left = Math.max(viewPoint.x, MIN_LEFT);
    top = Math.min(
      top,
      NAV_HEIGHT +
        this.props.canvasSize.height -
        MIN_BOTTOM -
        TOOLBAR_HEIGHT,
    );

    const style = {
      position: "fixed",

      top: top,
      left: left,
    };
    this.setState({ style });
  }

  render() {
    return (
      <div
        className="floating-toolbar toolbar"
        style={this.state.style}>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    viewChanged: state.graphic.viewChanged,
  };
};

export default connect(mapStateToProps)(FloatingToolbar);

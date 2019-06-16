import React from "react";
// https://github.com/frenic/csstype
import * as CSS from "csstype";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { AppEventType } from "../../common/Event/AppEventType";
import { connect } from "react-redux";
import GraphicText from "../../model/graphic/GraphicText";
import { cudElementAction } from "../../actions/changeElementActions";
import PaperUtil from "../../utils/PaperUtil";
import { enableKeyboardHandlerAction } from "../../actions/projectActions";
import { setSelectedPlacementIds } from "../../actions/graphicActions";

interface IProps {
  dispatch: Function;
}

class TextEditView extends React.Component<IProps> {
  private unsubscribeFn: any[] = [];
  private divRef = React.createRef<HTMLDivElement>();
  private placementId: string = "";
  private startText = "";
  public state = {
    show: false,
    text: "",
    style: {},
  };

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("startEditText", this.startEdit),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("keyDown", this.onKeyDown),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  onRootMouseDown = (event: React.MouseEvent) => {
    this.endEdit(true);
  };

  onTextMouseDown = (event: React.MouseEvent) => {
    // to not send event to the root (my parent div)
    event.stopPropagation();
  };

  onKeyDown = (type: AppEventType, event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        this.endEdit(false);
        break;
    }
  };

  private startEdit = (type: AppEventType, options: any) => {
    this.props.dispatch(enableKeyboardHandlerAction(false));
    console.log("onShowEditText:", options);
    this.placementId = options.placementId;
    this.startText = options.text;
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

    const node = this.divRef.current;
    if (node) {
      node.focus();
    }
  };

  private endEdit(deselectText: boolean) {
    this.props.dispatch(enableKeyboardHandlerAction(true));

    const node = this.divRef.current;
    let text = "";
    if (node) {
      text = node.innerHTML;
    }
    this.setState({
      show: false,
    });

    const placements = PaperUtil.getPlacementsById([
      this.placementId,
    ]);
    if (placements.length > 0) {
      const graphicText = placements[0] as GraphicText;
      graphicText.setText(text);
      // graphicText.transition("reset");
      if (text !== this.startText) {
        this.savePlacement(graphicText, text);
        if (deselectText) {
          this.props.dispatch(setSelectedPlacementIds([]));
        }
      } else {
        graphicText.setMode(null);
        this.props.dispatch(setSelectedPlacementIds([]));
      }
    }
  }

  private savePlacement(graphicText: GraphicText, newText: string) {
    const newGraphicText = graphicText.clone();
    newGraphicText.setText(newText);
    this.props.dispatch(
      cudElementAction("placement", undefined, newGraphicText),
    );
  }

  render() {
    if (!this.state.show) {
      return null;
    }

    const style: CSS.Properties = {
      ...this.state.style,
      position: "absolute",
      border: "none",
      overflowWrap: "break-word",
      whiteSpace: "pre-wrap",
      outline: "none",
    };

    const rootStyle: CSS.Properties = {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
    };

    return (
      <div style={rootStyle} onMouseDown={this.onRootMouseDown}>
        <div
          ref={this.divRef}
          contentEditable
          style={style}
          onMouseDown={this.onTextMouseDown}
          suppressContentEditableWarning={true}>
          {this.state.text}
        </div>
      </div>
    );
  }
}

export default connect()(TextEditView);

import React from "react";
// https://github.com/frenic/csstype
import * as CSS from "csstype";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { connect } from "react-redux";
import GraphicText from "../../model/graphic/GraphicText";
import PaperUtil from "../../utils/PaperUtil";
import { enableShortcutHandlerAction } from "../../actions/projectActions";
import Placement from "../../model/Placement";

interface IProps {
  dispatch: Function;
}

class TextEditView extends React.Component<IProps> {
  private unsubscribeFn: any[] = [];
  private divRef = React.createRef<HTMLDivElement>();
  private placementId: string = "";
  private placement: Placement | null = null;
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
    if (!this.state.show) {
      return;
    }
    // to not send event to the root (my parent div)
    event.stopPropagation();
  };

  onKeyDown = (event: KeyboardEvent) => {
    if (!this.state.show) {
      return;
    }
    switch (event.key) {
      case "Escape":
        this.endEdit(false);
        break;
    }
  };

  private startEdit = (options: any) => {
    this.props.dispatch(enableShortcutHandlerAction(false));
    this.placementId = options.placementId;
    this.placement = options.placement;
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
    this.props.dispatch(enableShortcutHandlerAction(true));

    const node = this.divRef.current;
    let text = "";
    if (node) {
      text = node.innerHTML;
    }
    this.setState({
      show: false,
    });

    let placements = PaperUtil.getPlacementsById([this.placementId]);
    if (this.placement && placements.length === 0) {
      placements = [this.placement];
      this.placement = null;
    }
    if (placements.length > 0) {
      const graphicText = placements[0] as GraphicText;
      graphicText.endEditText(text, deselectText);
    }
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
          className="edit-text"
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

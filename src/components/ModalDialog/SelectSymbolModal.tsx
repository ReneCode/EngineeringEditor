import React from "react";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import SymbolList from "./SymbolList";
import { enableShortcutHandlerAction } from "../../actions/projectActions";
import { connect } from "react-redux";

interface IProps {
  dispatch: Function;
}

class SelectSymbolModal extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  state = {
    top: 195,
    left: 60,
  };

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("keyDown", this.onKeyDown),
    );
    this.props.dispatch(enableShortcutHandlerAction(false));
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
    this.props.dispatch(enableShortcutHandlerAction(true));
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event && event.key === "Escape") {
      appEventDispatcher.dispatch("showModal", "");
    }
  };

  // onSelectPlaceSymbol = (type: string, event: MouseEvent) => {
  //   if (!event) {
  //     this.setState({
  //       top: 195,
  //       left: 151,
  //     });
  //     return;
  //   }
  //   const ele: HTMLElement = event.target as HTMLElement;
  //   if (ele) {
  //     // calc the position where to place the toolbar
  //     const rect = ele.getClientRects()[0];
  //     const GAP = 8;
  //     this.setState({
  //       top: rect.top,
  //       left: rect.left + ele.clientWidth + GAP,
  //     });
  //   }
  // };

  onClickSymbol = (name: string) => {
    // remove my dialog
    appEventDispatcher.dispatch("showModal", null);
    // start placing that selected symbol
    appEventDispatcher.dispatch(
      "startInteraction",
      "IacPlaceSymbol",
      { symbolName: name }, // props for IacPlaceSymbol
    );
  };

  onClose = () => {
    appEventDispatcher.dispatch("showModal", null);
  };

  render() {
    const style = {
      // width: "100px",
      // height: "80px",
      left: this.state.left,
      top: this.state.top,
    };

    return (
      <div style={style} className="toolbar place-symbol-toolbar">
        <SymbolList
          onClickSymbol={this.onClickSymbol}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

export default connect()(SelectSymbolModal);

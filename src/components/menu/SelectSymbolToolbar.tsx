import React from "react";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import SymbolList from "./SymbolList";

interface IProps {}

class SelectSymbolToolbar extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  state = {
    show: false,
    top: 10,
    left: 10,
  };
  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe(
        "selectPlaceSymbol",
        this.onSelectPlaceSymbol,
      ),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  onSelectPlaceSymbol = (type: string, event: MouseEvent) => {
    const ele: HTMLElement = event.target as HTMLElement;
    if (ele) {
      // calc the position where to place the toolbar
      const rect = ele.getClientRects()[0];
      const GAP = 8;
      this.setState({
        show: !this.state.show,
        top: rect.top,
        left: rect.left + ele.clientWidth + GAP,
      });
    }
  };

  onClickSymbol = (name: string) => {
    this.setState({
      show: false,
    });
    console.log("symbol:", name);
    appEventDispatcher.dispatch(
      "startInteraction",
      "IacCreateSymbolRef",
      { symbolName: name },
    );
  };

  render() {
    if (!this.state.show) {
      return false;
    }

    const style = {
      // width: "100px",
      // height: "80px",
      left: this.state.left,
      top: this.state.top,
    };

    return (
      <div style={style} className="toolbar place-symbol-toolbar">
        <SymbolList onClickSymbol={this.onClickSymbol} />
      </div>
    );
  }
}

export default SelectSymbolToolbar;

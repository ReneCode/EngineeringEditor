import React from "react";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";

interface IProps {}

class SelectSymbolToolbar extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  state = {
    show: false,
  };
  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("placeSymbol", this.onPlaceSymbol),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  onPlaceSymbol = () => {
    console.log("placeSymbol");
    this.setState({ show: !this.state.show });
  };

  render() {
    if (!this.state.show) {
      return false;
    }

    const style = {
      width: "100px",
      height: "80px",
    };

    return (
      <div style={style} className="place-symbl-button">
        Hallo
      </div>
    );
  }
}

export default SelectSymbolToolbar;

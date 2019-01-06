import React, { Component, SyntheticEvent } from "react";

interface IProps {
  item: any;
  property: string;
  onChange?: Function;
}
class PropertyView extends Component<IProps> {
  timeoutId: any;
  state: {
    value: string;
  };
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: this.props.item[this.props.property],
    };
  }
  onChange = (ev: SyntheticEvent) => {
    const value = (ev.target as HTMLInputElement).value;
    this.setState({
      value,
    });

    if (this.props.onChange) {
      clearTimeout(this.timeoutId);
      const func = this.props.onChange;
      const callFunc = () => {
        func(this.props.item, this.props.property, value);
      };
      this.timeoutId = setTimeout(callFunc, 1000);
    }
    // ev.preventDefault();
    // ev.stopPropagation();
  };

  render() {
    // const value = this.props.item[this.props.property];
    return (
      <div className="PropertyView">
        <div className="prop-name">{this.props.property}</div>
        <input
          className="prop-value"
          type="text"
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default PropertyView;

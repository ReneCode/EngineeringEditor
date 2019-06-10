import React, { SyntheticEvent } from "react";
import { IGlobalState } from "../../store/reducers";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import { connect } from "react-redux";

interface IProps {
  symbols: GraphicSymbol[];
  onClickSymbol: Function;
}

class SymbolList extends React.Component<IProps> {
  state = {
    filter: "",
  };

  onChangeFilter = (event: SyntheticEvent) => {
    const input = event.target as HTMLInputElement;
    this.setState({
      filter: input.value,
    });
  };

  render() {
    return (
      <div className="symbol-list">
        <div className="header">
          <input
            autoFocus
            type="text"
            placeholder="search"
            value={this.state.filter}
            onChange={this.onChangeFilter}
          />
        </div>
        <div className="list">
          {this.props.symbols
            .filter(s => s.name.includes(this.state.filter))
            .map((s, idx) => {
              return (
                <div
                  className="item"
                  key={idx}
                  onClick={() => this.props.onClickSymbol(s.name)}>
                  {s.name}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    symbols: state.graphic.symbols,
  };
};
export default connect(mapStateToProps)(SymbolList);

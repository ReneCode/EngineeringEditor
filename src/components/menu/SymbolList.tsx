import React from "react";
import { IGlobalState } from "../../store/reducers";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import { connect } from "react-redux";

interface IProps {
  symbols: GraphicSymbol[];
  onClickSymbol: Function;
}

class SymbolList extends React.Component<IProps> {
  render() {
    return (
      <div className="symbol-list">
        <div className="header">Symbols</div>
        {this.props.symbols.map((s, idx) => {
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
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    symbols: state.graphic.symbols,
  };
};
export default connect(mapStateToProps)(SymbolList);

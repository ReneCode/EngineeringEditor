import React from "react";
import { IGlobalState } from "../../store/reducers";
import { connect } from "react-redux";

import { ModalIdType } from "../../model/types";
import SelectSymbolModal from "./SelectSymbolModal";

interface IProps {
  currentModalId: ModalIdType;
}

class ModalDialog extends React.Component<IProps> {
  render() {
    switch (this.props.currentModalId) {
      case "selectSymbol":
        return <SelectSymbolModal />;
      // case "placementTools":
      //   return <PlacementToolsModal />;
      case "":
      case null:
        return null;
      // case undefined:
      // case null:
      //   return <KeyboardHandler />;
      default:
        throw new Error(`bad ModalId: ${this.props.currentModalId}`);
    }
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    currentModalId: state.project.currentModalId,
  };
};

export default connect(mapStateToProps)(ModalDialog);

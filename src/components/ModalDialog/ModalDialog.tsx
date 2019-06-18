import React from "react";
import { IGlobalState } from "../../store/reducers";
import { connect } from "react-redux";

import { ModalIdType } from "../../model/types";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { showModal } from "../../actions";
import SelectSymbolModal from "./SelectSymbolModal";
// import KeyboardHandler from "./KeyboardHandler";

interface IProps {
  currentModalId: ModalIdType;
  dispatch: Function;
}

class ModalDialog extends React.Component<IProps> {
  private unsubscribeFn: any;

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "showModal",
      this.onShowModal,
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onShowModal = (modalId: ModalIdType) => {
    this.props.dispatch(showModal(modalId));
  };

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

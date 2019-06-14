import React from "react";
import { IGlobalState } from "../../store/reducers";
import { connect } from "react-redux";

import { ModalIdType, DispatchFunction } from "../../model/types";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { AppEventType } from "../../common/Event/AppEventType";
import { showModal } from "../../actions";
import SelectSymbolModal from "./SelectSymbolModal";
// import KeyboardHandler from "./KeyboardHandler";

interface IProps {
  currentModalId: ModalIdType;
  dispatch: DispatchFunction;
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

  onShowModal = (type: AppEventType, modalId: ModalIdType) => {
    this.props.dispatch(showModal(modalId));
  };

  render() {
    switch (this.props.currentModalId) {
      case "selectSymbol":
        return <SelectSymbolModal />;
      // case "placementTools":
      //   return <PlacementToolsModal />;
      case "":
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

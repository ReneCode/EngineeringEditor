import React from "react";
import appEventDispatcher from "./AppEventDispatcher";
import { Component } from "react";
import { AppEventType } from "./AppEventType";
import InteractionFactory from "./InteractionFactory";
import { any } from "prop-types";

interface IProps {}

class InteractionManager extends Component<IProps> {
  unsubscribeFn: Function[] = [];
  state = {
    interactionName: "",
    props: any,
    idle: true,
  };

  fixInteractionNames = [
    "UndoRedo",
    "SnapGrid",
    "Delete",
    "ZoomInOut",
    "IacPreviousNextPage",
    "IacExportSvg",
    "IacChangeProperty",
    "IacGroup",
    "IacUngroup",
    "IacCreateSymbolAndSymbolRef",
  ];

  idleInteractionNames = [
    "IacEditItem",
    "IacSelectAll",
    "IacSelect",
    "HoverItem",
  ];

  componentWillMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe(
        "stopInteraction",
        this.stopInteraction,
      ),
    );

    this.unsubscribeFn.push(
      appEventDispatcher.subscribe(
        "startInteraction",
        this.startInteraction,
      ),
    );

    appEventDispatcher.dispatch("stopInteraction");
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  startInteraction = (
    type: AppEventType,
    name: string,
    props: any,
  ) => {
    this.setState({
      interactionName: name,
      props: props,
      idle: false,
    });
  };

  stopInteraction = (type: AppEventType, payload: any) => {
    this.setState({
      interactionName: "Idle",
      idle: true,
    });
  };

  render() {
    let currentInteraction;
    if (this.state.interactionName) {
      currentInteraction = InteractionFactory.create(
        this.state.interactionName,
        this.state.props,
      );
    }
    return (
      <React.Fragment>
        {this.fixInteractionNames.map(name => {
          return InteractionFactory.create(name);
        })}
        {this.state.idle &&
          this.idleInteractionNames.map(name => {
            return InteractionFactory.create(name);
          })}

        {currentInteraction}
      </React.Fragment>
    );
  }
}

export default InteractionManager;

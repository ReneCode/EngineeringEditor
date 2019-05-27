import React from "react";
import appEventDispatcher from "./AppEventDispatcher";
import { Component } from "react";
import { AppEventType } from "./AppEventType";
import InteractionFactory from "./InteractionFactory";

interface IProps {}

class InteractionManager extends Component<IProps> {
  unsubscribeFn: Function[] = [];
  state = {
    interactionName: "",
    idle: true,
  };

  fixInteractionNames = [
    "UndoRedo",
    "SnapGrid",
    "Delete",
    "ZoomInOut",
    "IacPreviousNextPage",
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

  startInteraction = (type: AppEventType, payload: any) => {
    this.setState({
      interactionName: payload,
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
      );
    }
    return (
      <React.Fragment>
        {this.state.idle &&
          this.idleInteractionNames.map(name => {
            return InteractionFactory.create(name);
          })}

        {this.fixInteractionNames.map(name => {
          return InteractionFactory.create(name);
        })}
        {currentInteraction}
      </React.Fragment>
    );
  }
}

export default InteractionManager;

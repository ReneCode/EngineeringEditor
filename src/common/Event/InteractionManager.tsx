import React from "react";
import appEventDispatcher from "./AppEventDispatcher";
import { Component } from "react";
import { AppEventType } from "./AppEventType";
import IacSelect from "../interaction/IacSelect";
import InteractionFactory from "./InteractionFactory";

interface IProps {}

class InteractionManager extends Component<IProps> {
  unsubscribeFn: any;
  state = {
    interactionNames: [],
  };

  componentWillMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "startInteraction",
      this.startInteraction,
    );

    appEventDispatcher.dispatch("startInteraction", "Select");
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  startInteraction = (type: AppEventType, payload: any) => {
    const newNames: string[] = this.state.interactionNames.slice(
      0,
      this.state.interactionNames.length - 1,
    );
    newNames.push(payload);
    this.setState({
      interactionNames: newNames,
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.interactionNames.map(name => {
          return InteractionFactory.create(name);
        })}
      </React.Fragment>
    );
  }
}

export default InteractionManager;

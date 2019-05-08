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
    interactionNames: ["UndoRedo", "SnapGrid"],
  };

  componentWillMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "startInteraction",
      this.startInteraction,
    );

    appEventDispatcher.dispatch("startInteraction", {
      name: "Select",
      replace: false,
    });
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  startInteraction = (type: AppEventType, payload: any) => {
    let name: string;
    let replace = true;
    if ("string" === typeof payload) {
      name = payload;
    } else {
      name = payload.name;
      replace = payload.replace;
    }
    let newNames: string[] = [];
    if (!replace) {
      newNames = this.state.interactionNames;
    } else {
      newNames = this.state.interactionNames.slice(
        0,
        this.state.interactionNames.length - 1,
      );
    }
    newNames.push(name);
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

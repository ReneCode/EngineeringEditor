import { AppEventType } from "./AppEventType";
import { IAppEventHandler } from "./IAppEventHandler";

export interface AppEvent {
  type: AppEventType;
  payload?: any;
}

class AppEventDispatcher {
  eventHandlers: IAppEventHandler[] = [];

  subscribe(eventHandler: IAppEventHandler) {
    this.eventHandlers.push(eventHandler);
  }

  dispatch(event: AppEvent) {
    this.eventHandlers.forEach(s => {
      try {
        s.receiveEvent(event);
      } catch (ex) {
        console.log(
          `Exception on dispatching Event: ${event} to ${s}`,
        );
      }
    });
  }
}

const appEventDispatcher = new AppEventDispatcher();
export default appEventDispatcher;

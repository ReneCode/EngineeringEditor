type AppEventType =
  | ""
  | "mouseMove"
  | "mouseDrag"
  | "mouseDown"
  | "mouseUp"
  | "startInteraction";

export interface AppEvent {
  type: AppEventType;
  payload?: any;
}

export interface AppEventSubscriber {
  receiveEvent(event: AppEvent): void;
}

class AppEventDispatcher {
  subscribers: AppEventSubscriber[] = [];

  subscribe(subscriber: AppEventSubscriber) {
    this.subscribers.push(subscriber);
  }

  dispatch(event: AppEvent) {
    this.subscribers.forEach(s => {
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

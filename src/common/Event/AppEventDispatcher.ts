import { AppEventType } from "./AppEventType";
// import { IAppEventHandler } from "./IAppEventHandler";

// export interface AppEvent {
//   type: AppEventType;
//   payload?: any;
// }

type AppEventHandler = (type: AppEventType, payload: any) => void;

class AppEventDispatcher {
  private eventHandlers: {
    id: string;
    type: AppEventType;
    handler: AppEventHandler;
  }[] = [];

  subscribe(type: AppEventType, handler: AppEventHandler) {
    const id = `${Math.floor(Math.random() * 10e10)}`;
    this.eventHandlers.push({ id, type, handler });
    return () => {
      this.eventHandlers = this.eventHandlers.filter(
        eh => eh.id !== id,
      );
    };
  }

  dispatch(type: AppEventType, payload: any = undefined) {
    // console.log(":dispatch:", type);
    this.eventHandlers.forEach(eh => {
      try {
        if (eh.type == type) {
          eh.handler(type, payload);
        }
      } catch (ex) {
        console.error(
          `Exception on dispatching Event: ${type} + ${payload} to ${
            eh.handler
          }`,
        );
      }
    });
  }
}

const appEventDispatcher = new AppEventDispatcher();
export default appEventDispatcher;

import { AppEventType } from "./AppEventType";
// import { IAppEventHandler } from "./IAppEventHandler";

// export interface AppEvent {
//   type: AppEventType;
//   payload?: any;
// }

type AppEventHandler = (
  type: AppEventType,
  payload: any,
) => void | string;

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
    // console.log(":dispatch:", type, payload);
    for (let eh of this.eventHandlers) {
      try {
        if (eh.type === type) {
          const result = eh.handler(type, payload);
          if (result === "stop") {
            break;
          }
        }
      } catch (ex) {
        // if DEBUG
        throw ex;
        // if RELEASE
        // console.error(
        //   `Exception on dispatching Event: ${type} + ${payload} to ${
        //     eh.handler
        //   }`,
        // );
      }
    }
  }
}

const appEventDispatcher = new AppEventDispatcher();
export default appEventDispatcher;

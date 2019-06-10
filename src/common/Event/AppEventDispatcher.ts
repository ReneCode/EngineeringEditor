import { AppEventType } from "./AppEventType";
import createId from "../../model/createId";
// import { IAppEventHandler } from "./IAppEventHandler";

// export interface AppEvent {
//   type: AppEventType;
//   payload?: any;
// }

type AppEventHandler = (
  type: AppEventType,
  ...params: any
) => void | string;

class AppEventDispatcher {
  private eventHandlers: {
    id: string;
    type: AppEventType;
    handler: AppEventHandler;
  }[] = [];

  subscribe(type: AppEventType, handler: AppEventHandler) {
    const id = createId("evH-");
    this.eventHandlers.push({ id, type, handler });
    // return a function to unsubscribe
    return () => {
      this.eventHandlers = this.eventHandlers.filter(
        eh => eh.id !== id,
      );
    };
  }

  dispatch(type: AppEventType, ...params: any) {
    // console.log(":dispatch:", type, params);
    let handled = false;
    for (let eh of this.eventHandlers) {
      try {
        if (eh.type === type) {
          const result = eh.handler(type, ...params);
          handled = true;
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
    if (!handled) {
      console.warn("no appEventHandler found for:", type);
    }
  }
}

const appEventDispatcher = new AppEventDispatcher();
export default appEventDispatcher;

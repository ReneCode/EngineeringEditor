import { AppEvent } from "./AppEventDispatcher";
export interface IAppEventHandler {
  receiveEvent(event: AppEvent): void;
}

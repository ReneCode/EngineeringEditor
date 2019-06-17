export interface IAction {
  type: string;
  payload?: any;
}

export type DispatchFunction = (action: IAction) => any;

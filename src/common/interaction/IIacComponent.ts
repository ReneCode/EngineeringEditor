import Paper from "paper";

export interface IIacComponent {
  onMouseDown(event: Paper.MouseEvent): void;
  onMouseUp(event: Paper.MouseEvent): void;
  onMouseMove(event: Paper.MouseEvent): void;
  onMouseDrag(event: Paper.MouseEvent): void;
}

export class IIacNull implements IIacComponent {
  onMouseDown(event: Paper.MouseEvent): void {}
  onMouseUp(event: Paper.MouseEvent): void {}
  onMouseMove(event: Paper.MouseEvent): void {}
  onMouseDrag(event: Paper.MouseEvent): void {}
}

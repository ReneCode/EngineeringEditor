import IaBase from "./IaBase";
// import { setCursorModeAction } from "../../actions/setCursorPoint";
import GraphicGrip from "../../model/graphic/GraphicGrip";

class IaSelect extends IaBase {
  /*
  constructor(context: IaContext) {
    super(context);
  }

  getItemsFromRect({ p1, p2 }: IaRectRubberbandResult): Placement[] {
    // null-size box is invalid
    if (p1.equal(p2)) {
      return [];
    }
    const box = new Box(p1, p2);
    const items = this.context
      .getState()
      .graphic.items.filter(p => p.pickable() && p.insideBox(box));
    return items;
  }
  async start() {
    try {
      // this.context.dispatch(setCursorModeAction("select"));

      const result = await this.context.getEvent([
        IaEventType.mouseDown,
        IaEventType.keyDown,
      ]);
      if (this.isEscape(result)) {
        // this.context.dispatch(setCursorModeAction());
        return;
      }
      if (result.type === IaEventType.keyDown) {
        const event = result.event as KeyboardEvent;
        let itemsToDelete = this.context.getState().graphic
          .selectedItems;
        if (itemsToDelete.length > 0) {
          if (event.key === "Backspace") {
            await this.context.dispatch(
              deleteElementAction("placement", itemsToDelete),
            );
          }
        }
      }
      if (result.type === IaEventType.mouseDown) {
        const firstPoint = result.pointWc;
        let items = this.pickItems(firstPoint);

        const grips = items.filter(i => i instanceof GraphicGrip);
        if (grips.length > 0) {
          await this.moveGrip(grips as GraphicGrip[], firstPoint);
        } else {
          // if shift-key is pressed, than the new selection
          // will be added to the old selection
          // otherwise the new selection will replace the old selection
          const event = result.event as MouseEvent;
          const addSelection = event.shiftKey;

          if (items.length === 0) {
            // no item picked => select by rect-rubberband
            await this.selectItemsWithRubberband(
              addSelection,
              firstPoint,
            );
          } else {
            // some items selected
            await this.moveItems(items, addSelection, firstPoint);
          }
        }
      }
      // this.context.dispatch(setCursorModeAction());

      return { restart: true };
    } finally {
    }
  }

  moveGrip = async (grips: GraphicGrip[], firstPoint: Point) => {
    let run = true;
    while (run) {
      const result = await this.context.getEvent([
        IaEventType.mouseMove,
        IaEventType.mouseUp,
      ]);
      const pt = result.pointWc;
      const delta = pt.sub(firstPoint);

      const movedGrips = grips.map(g => g.translate(delta));

      const changedPlacements = movedGrips.map(g =>
        g.parent.gripChanged(g.pt, g.payload),
      );

      await this.context.dispatch(
        setTempItem(changedPlacements.concat(movedGrips)),
      );
      if (result.type === IaEventType.mouseUp) {
        await this.context.dispatch(setTempItem());
        await this.context.dispatch(
          updateElementAction("placement", changedPlacements),
        );
        await this.context.dispatch(
          setSelectedItemAction(changedPlacements),
        );
        run = false;
      }
    }
  };

  selectItemsWithRubberband = async (
    addSelection: boolean,
    firstPoint: Point,
  ) => {
    if (!addSelection) {
      // create new selection - so clear the old selection before
      this.context.dispatch(setSelectedItemAction([]));
    }

    const iaRectRubberband = new IaRectRubberband(this.context);
    const result = await iaRectRubberband.start(firstPoint);
    if (result) {
      const itemsInRect = this.getItemsFromRect(result);
      if (addSelection) {
        this.context.dispatch(addSelectedItemAction(itemsInRect));
      } else {
        this.context.dispatch(setSelectedItemAction(itemsInRect));
      }
    }
  };

  moveItems = async (
    items: Placement[],
    addSelection: boolean,
    firstPoint: Point,
  ) => {
    if (addSelection) {
      await this.context.dispatch(addSelectedItemAction(items));
    } else {
      await this.context.dispatch(setSelectedItemAction(items));
    }
    const iaMove = new IaMove(this.context);
    await iaMove.start(firstPoint);
  };
  */
}

export default IaSelect;

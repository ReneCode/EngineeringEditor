import Paper from "paper";
import Placement from "../../model/Placement";
import InteractionBase, {
  InteractionContext,
} from "../../common/interaction/InteractionBase";
import InteractionRoot from "../../common/interaction/InteractionRoot";
import InteractionSelect from "../../common/interaction/InteractionSelect";

class PaperCanvas {
  interaction: InteractionBase;

  constructor(
    htmlCanvas: HTMLCanvasElement,
    private dispatch: Function,
  ) {
    Paper.setup(htmlCanvas);
    Paper.settings.handleSize = 8;

    Paper.view.onMouseDown = this.onMouseDown;
    Paper.view.onMouseUp = this.onMouseUp;
    Paper.view.onMouseMove = this.onMouseMove;
    Paper.view.onMouseDrag = this.onMouseDrag;

    const context: InteractionContext = {
      dispatch,
    };
    this.interaction = new InteractionRoot(context);
  }

  public startInteraction(interaction: string) {
    if (this.interaction) {
      this.interaction.stop();
    }

    const context: InteractionContext = {
      dispatch: this.dispatch,
    };
    switch (interaction) {
      case "select":
        this.interaction = new InteractionSelect(context);
        break;
      default:
        throw new Error(`unknown interaction ${interaction}`);
    }
  }

  public redraw(items: Placement[]) {
    // drawCanvas(Paper.project, items);
  }

  public setSelectedPaperItems(selectedPaperItems: Paper.Item[]) {
    this.interaction.setSelectedPaperItems(selectedPaperItems);
  }

  private onMouseDown = (event: Paper.MouseEvent) => {
    this.interaction.onMouseDown(event);
  };

  private onMouseUp = (event: Paper.MouseEvent) => {
    this.interaction.onMouseUp(event);
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    this.interaction.onMouseDrag(event);
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    this.interaction.onMouseMove(event);
  };
}

export default PaperCanvas;

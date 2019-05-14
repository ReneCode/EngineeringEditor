import InteractionBase, {
  InteractionContext,
} from "./InteractionBase";

class InteractionRoot extends InteractionBase {
  constructor(context: InteractionContext) {
    super(context);
  }
}

export default InteractionRoot;

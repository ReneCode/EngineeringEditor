import interactionReducer, {
  IInteractionState,
} from "./interactionReducer";
import {
  addEventHandlerAction,
  removeEventHandlerAction,
} from "../actions";

describe("interactionReducer", () => {
  let initialState: IInteractionState;

  beforeEach(() => {
    initialState = {
      doInteractionHandler: null,
      eventHandler: [],
    };
  });

  it("addEventHandler", () => {
    const a1 = addEventHandlerAction("a", () => 1);
    const s1 = interactionReducer(initialState, a1);
    expect(s1.eventHandler).toHaveLength(1);
    expect(s1.eventHandler[0].eventType).toEqual("a");
    expect(s1.eventHandler[0].handler()).toEqual(1);

    const a2 = addEventHandlerAction("b", () => 2);
    const s2 = interactionReducer(s1, a2);
    expect(s2.eventHandler).toHaveLength(2);
    expect(s2.eventHandler[1].eventType).toEqual("b");
    expect(s2.eventHandler[1].handler()).toEqual(2);
  });

  it("removeEventHandler", () => {
    const a1 = addEventHandlerAction("a", () => 1);
    const s1 = interactionReducer(initialState, a1);

    const funcB = () => 2;
    const a2 = addEventHandlerAction("b", funcB);
    const s2 = interactionReducer(s1, a2);

    const a3 = addEventHandlerAction("c", () => 3);
    const s3 = interactionReducer(s2, a3);

    // remove handler
    const a4 = removeEventHandlerAction("b", funcB);
    const s4 = interactionReducer(s3, a4);

    expect(s4.eventHandler).toHaveLength(2);
    expect(s4.eventHandler[0].eventType).toEqual("a");
    expect(s4.eventHandler[1].eventType).toEqual("c");
  });
});

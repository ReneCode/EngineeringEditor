import Paper from "paper";
import GraphicLine from "../model/graphic/GraphicLine";
import * as actionTypes from "../actions/actionTypes";

import graphicReducer, { IGraphicState } from "./graphicReducer";
import Placement from "../model/Placement";

describe("graphicReducer", () => {
  let initialState: IGraphicState;
  let line1: Placement;
  let line2: Placement;
  let line3: Placement;

  beforeEach(() => {
    initialState = {
      selectedPlacementIds: [],
      redrawn: 0,
      symbols: [],
      items: [],
      viewport: {
        x: -500,
        y: -500,
        width: 1000,
        height: 1000,
      },
      canvas: {
        width: 100,
        height: 100,
        gridX: 4,
        gridY: 4,
        useGrid: true,
      },
    };

    line1 = new GraphicLine(
      new Paper.Point(1, 2),
      new Paper.Point(3, 4),
    );
    line1.id = "l1";

    line2 = new GraphicLine(
      new Paper.Point(10, 20),
      new Paper.Point(30, 40),
    );
    line2.id = "l2";

    line3 = new GraphicLine(
      new Paper.Point(10, 20),
      new Paper.Point(30, 40),
    );
    line3.id = "l3";
  });

  it("DELETE_LAYER", () => {
    line1.layer = "autoconnect";
    initialState.items = [line1, line2, line3];

    const action = {
      type: actionTypes.DELETE_LAYER,
      payload: ["autoconnect"],
    };

    const newState = graphicReducer(initialState, action);
    const items = newState.items;
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveProperty("id", "l2");
    expect(items[1]).toHaveProperty("id", "l3");
  });

  it("ADD_PLACEMENT", () => {
    const l1 = new GraphicLine(
      new Paper.Point(1, 2),
      new Paper.Point(3, 4),
    );
    l1.id = "l1";
    const l2 = new GraphicLine(
      new Paper.Point(10, 20),
      new Paper.Point(30, 40),
    );
    l2.id = "l2";
    const l3 = new GraphicLine(
      new Paper.Point(10, 20),
      new Paper.Point(30, 40),
    );
    l3.id = "l3";

    const action = {
      type: actionTypes.ADD_PLACEMENT,
      payload: [
        { id: "l1", name: "new-L1" },
        { id: "l3", name: "new-L3" },
      ],
    };

    const newState = graphicReducer(initialState, action);
    const items = newState.items;
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveProperty("id", "l1");
    expect(items[1]).toHaveProperty("id", "l3");
  });

  it("DELETE_PLACEMENT", () => {
    initialState.selectedPlacementIds = ["l2"];
    initialState.items = [line1, line2, line3];
    const action = {
      type: actionTypes.DELETE_PLACEMENT,
      payload: [line2],
    };

    const newState = graphicReducer(initialState, action);
    const items = newState.items;
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveProperty("id", "l1");
    expect(items[1]).toHaveProperty("id", "l3");
    expect(newState.selectedPlacementIds).toEqual([]);
  });
});

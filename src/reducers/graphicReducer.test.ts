import GraphicLine from "../model/graphic/GraphicLine";
import Point from "../common/point";
import * as actionTypes from "../actions/actionTypes";

import graphicReducer, { IGraphicState } from "./graphicReducer";

describe("graphicReducer", () => {
  let initialState: IGraphicState;

  beforeEach(() => {
    initialState = {
      symbols: [],
      items: [],
      selectedItems: [],
      tempItems: [],
      cursor: {
        pt: new Point(0, 0),
        radiusScreen: 10,
        mode: "",
      },
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
  });

  it("DELETE_LAYER", () => {
    const l1 = new GraphicLine(new Point(1, 2), new Point(3, 4));
    l1.id = "l1";
    l1.layer = "Layer-A";

    const l2 = new GraphicLine(new Point(10, 20), new Point(30, 40));
    l2.id = "l2";
    l2.layer = "Layer-B";

    const l3 = new GraphicLine(new Point(10, 20), new Point(30, 40));
    l3.id = "l3";

    initialState.items = [l1, l2, l3];

    const action = {
      type: actionTypes.DELETE_LAYER,
      payload: ["Layer-A", "Layer-C"],
    };

    const newState = graphicReducer(initialState, action);
    const items = newState.items;
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveProperty("id", "l2");
    expect(items[1]).toHaveProperty("id", "l3");
  });

  it("UPDATE_SELECTED_ITEM", () => {
    const l1 = new GraphicLine(new Point(1, 2), new Point(3, 4));
    l1.id = "l1";
    const l2 = new GraphicLine(new Point(10, 20), new Point(30, 40));
    l2.id = "l2";
    const l3 = new GraphicLine(new Point(10, 20), new Point(30, 40));
    l3.id = "l3";

    initialState.selectedItems = [l1, l2, l3];
    const action = {
      type: actionTypes.UPDATE_SELECTED_ITEM,
      payload: [
        { id: "l1", name: "new-L1" },
        { id: "l3", name: "new-L3" },
      ],
    };

    const newState = graphicReducer(initialState, action);
    const items = newState.selectedItems;
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveProperty("id", "l1");
    expect(items[0]).toHaveProperty("name", "new-L1");
    expect(items[1]).toEqual(l2);
    expect(items[2]).toHaveProperty("id", "l3");
    expect(items[2]).toHaveProperty("name", "new-L3");
  });
});

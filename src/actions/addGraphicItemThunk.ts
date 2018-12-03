import GraphicBase from "../model/graphic/GraphicBase";
import * as actions from ".";
import { IGlobalState } from "../reducers";
import { IdType } from "../model/types";
import Placement from "../model/Placement";
import { graphql } from "../common/graphql-api";

// -> Placement
const apiCreatePlacement = async (
  projectId: IdType,
  pageId: IdType,
  graphic: GraphicBase,
) => {
  try {
    if (!(graphic instanceof GraphicBase)) {
      throw new Error("bad graphic:" + graphic);
    }

    // save to database
    const placement = new Placement(projectId, pageId, graphic);
    const json: any = placement.toDTO();
    const mutation = `mutation createPlacement($input: CreatePlacementInput!) {
      createPlacement(input: $input) { id, projectId, pageId, type, graphic }
    }`;
    const variables = {
      input: {
        projectId,
        pageId,
        type: graphic.type,
        graphic: json.graphic,
      },
    };
    const result = await graphql(mutation, variables);
    const newItem = Placement.fromDTO(result.createPlacement);
    return newItem;
  } catch (err) {}
};

export const addGraphicItemThunk = (graphic: GraphicBase) => {
  return async (dispatch: Function, getState: Function) => {
    await dispatch(actions.addGraphicItem(graphic));

    const state: IGlobalState = getState();
    const projectId = state.project.projectId;
    const pageId = state.project.pageId;
    await apiCreatePlacement(projectId, pageId, graphic);
  };
};

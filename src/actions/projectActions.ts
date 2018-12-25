import * as actionTypes from "./actionTypes";
import { IdType } from "../model/types";
import { IGlobalState } from "../reducers";
import { Page } from "csstype";
import { apiLoadSymbol } from "./apiLoadSymbol";
import { apiLoadPage } from "./apiLoadPage";

export const setProjectId = (projectId: IdType) => {
  return async (dispatch: any): Promise<any> => {
    const symbols = await apiLoadSymbol(projectId);

    dispatch({
      type: actionTypes.SET_PROJECT_ID,
      payload: projectId,
    });

    dispatch({
      type: actionTypes.SET_SYMBOLS,
      payload: symbols,
    });
  };
};

export const loadPages = (projectId: string) => {
  return async (dispatch: any): Promise<any> => {
    const pages = await apiLoadPage(projectId);
    console.log("::", pages);

    dispatch({
      type: actionTypes.SET_PAGES,
      payload: pages,
    });
  };
};

export const createPage = (
  projectId: string,
  page: Page,
  callback: () => {},
) => {
  return {
    type: actionTypes.CREATE_PAGE,
    payload: {
      projectId,
      page,
      callback,
    },
  };
};

export const addPage = (page: Page) => {
  return {
    type: actionTypes.ADD_PAGE,
    payload: page,
  };
};

// export const setPages = (pages: Page[]) => {
//   return {
//     type: actionTypes.SET_PAGES,
//     payload: pages,
//   };
// };

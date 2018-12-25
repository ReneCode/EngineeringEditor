import * as actionTypes from "./actionTypes";
import { IdType } from "../model/types";
import { Page } from "csstype";
import { apiLoadSymbol } from "./apiLoadSymbol";
import { apiLoadPage } from "./apiLoadPage";

export const setProjectId = (projectId: IdType) => {
  return async (dispatch: any): Promise<any> => {
    const symbols = await apiLoadSymbol(projectId);

    await dispatch({
      type: actionTypes.SET_PROJECT_ID,
      payload: projectId,
    });

    await dispatch({
      type: actionTypes.SET_SYMBOLS,
      payload: symbols,
    });
  };
};

export const loadPages = (projectId: string) => {
  return async (dispatch: any): Promise<any> => {
    const pages = await apiLoadPage(projectId);

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

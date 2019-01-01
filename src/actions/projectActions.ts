import * as actionTypes from "./actionTypes";
import { IdType } from "../model/types";
import { apiLoadSymbolsAction } from "./apiLoadSymbol";
import { apiLoadPagesAction } from "./apiLoadPage";
import apiCreatePage from "./apiCreatePage";
import Page from "../model/Page";

export const setProjectId = (projectId: IdType) => {
  return async (dispatch: any): Promise<any> => {
    const symbols = await apiLoadSymbolsAction(projectId);

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
    const pages = await apiLoadPagesAction(projectId);

    dispatch({
      type: actionTypes.SET_PAGES,
      payload: pages,
    });
  };
};

export const createPage = (page: Page): any => {
  return async (dispatch: any): Promise<Page> => {
    const newPage = await apiCreatePage(page);

    const action = {
      type: actionTypes.ADD_PAGE,
      payload: newPage,
    };
    await dispatch(action);
    return newPage;
  };
};

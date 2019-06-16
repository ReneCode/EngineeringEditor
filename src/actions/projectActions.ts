import * as actionTypes from "./actionTypes";
import { IdType } from "../model/types";
import apiLoadPages from "../common/api/apiLoadPage";
import apiCreatePage from "../common/api/apiCreatePage";
import Page from "../model/Page";
import apiLoadSymbols from "../common/api/apiLoadSymbol";

export const enableKeyboardHandlerAction = (enable: boolean) => {
  return {
    type: actionTypes.ENABLE_KEYBOARD_HANDLER,
    payload: enable,
  };
};

export const setProjectId = (projectId: IdType) => {
  return async (dispatch: any): Promise<any> => {
    const symbols = await apiLoadSymbols(projectId);

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

export const loadPagesAction = (projectId: string) => {
  return async (dispatch: any): Promise<any> => {
    const pages = await apiLoadPages(projectId);

    dispatch({
      type: actionTypes.SET_PAGES,
      payload: pages,
    });
  };
};

export const createPageAction = (page: Page): any => {
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

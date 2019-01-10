import * as actionTypes from "./actionTypes";
import Page from "../model/Page";
import { GetGlobalStateFunction } from "../model/types";
import apiUpdatePage from "../common/api/apiUpdatePage";

const updatePageAction = (page: Page) => {
  return async (
    dispatch: any,
    getState: GetGlobalStateFunction,
  ): Promise<any> => {
    await apiUpdatePage(page);

    await dispatch({
      type: actionTypes.UPDATE_PAGE,
      payload: page,
    });

    try {
    } catch (ex) {
      console.log(ex);
    }
  };
};

export default updatePageAction;

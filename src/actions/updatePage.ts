import * as actionTypes from "./actionTypes";
import Page from "../model/Page";
import { GetGlobalStateFunction } from "../model/types";
import apiUpdatePage from "../common/api/apiUpdatePage";

const updatePageAction = (
  page: Page,
  property: string,
  value: string,
) => {
  return async (
    dispatch: any,
    getState: GetGlobalStateFunction,
  ): Promise<any> => {
    await apiUpdatePage(page, property, value);

    await dispatch({
      type: actionTypes.UPDATE_PAGE,
      payload: {
        page,
        property,
        value,
      },
    });

    try {
    } catch (ex) {
      console.log(ex);
    }
  };
};

export default updatePageAction;

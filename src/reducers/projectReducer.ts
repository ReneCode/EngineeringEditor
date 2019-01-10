import * as actionTypes from "../actions/actionTypes";

import { ModalId, IdType } from "../model/types";
import Page from "../model/Page";
import { IAction } from "../actions/action";

export interface IProjectState {
  projectId: IdType;
  pageId: IdType;
  pages: Page[];
  showModalId: ModalId;
}

const initialState: IProjectState = {
  projectId: "",
  pageId: "",
  pages: [],
  showModalId: "",
};

const updatePage = (state: IProjectState, action: IAction) => {
  const newPage = action.payload;
  return {
    ...state,
    pages: state.pages.map(p => {
      if (p.id === newPage.id) {
        return newPage;
      } else {
        return p;
      }
    }),
  };
};

const projectReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL: {
      return {
        ...state,
        showModalId: action.payload,
      };
    }
    case actionTypes.SET_PAGES:
      return {
        ...state,
        pages: action.payload,
      };

    case actionTypes.SET_PAGE_ID:
      return {
        ...state,
        pageId: action.payload,
      };
    case actionTypes.ADD_PAGE:
      return {
        ...state,
        pages: state.pages.concat(action.payload),
      };

    case actionTypes.UPDATE_PAGE:
      return updatePage(state, action);

    case actionTypes.SET_PROJECT_ID:
      return {
        ...state,
        projectId: action.payload,
      };

    default:
      return state;
  }
};

export default projectReducer;

import * as actionTypes from "../actions/actionTypes";

import { ModalIdType } from "../model/types";
import Page from "../model/Page";
import { IAction } from "../actions/action";

export interface IProjectState {
  projectId: string;
  pageId: string;
  pages: Page[];
  currentModalId: ModalIdType;
  enableShortcutHandler: boolean;
  enablePlacementToolbar: boolean;
  pageViewports: {};
}

const initialState: IProjectState = {
  projectId: "",
  pageId: "",
  pages: [],
  currentModalId: "",
  enableShortcutHandler: true,
  enablePlacementToolbar: true,
  pageViewports: {},
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

// save viewport for each pageId
const setViewport = (
  state: IProjectState,
  action: IAction,
): IProjectState => {
  if (state.pageId) {
    const pageViewports = state.pageViewports;
    (pageViewports as any)[state.pageId] = action.payload;
    return {
      ...state,
      pageViewports,
    };
  } else {
    return state;
  }
};

const projectReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.ENABLE_SHORTCUT_HANDLER:
      return {
        ...state,
        enableShortcutHandler: action.payload,
      };

    case actionTypes.ENABLE_PLACEMENT_TOOLBAR:
      return { ...state, enablePlacementToolbar: action.payload };

    case actionTypes.SHOW_MODAL: {
      return {
        ...state,
        currentModalId: action.payload,
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

    case actionTypes.SET_VIEWPORT:
      return setViewport(state, action);

    default:
      return state;
  }
};

export default projectReducer;

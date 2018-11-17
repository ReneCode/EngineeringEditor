import * as actionTypes from "../actions/actionTypes";

const initialState = {
  projectId: undefined,
  pageId: undefined,
  pages: [],
};

const projectReducer = (
  state = initialState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
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

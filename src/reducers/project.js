import * as actionTypes from "../actions/actionTypes";

const initialState = {
  projectId: undefined,
  pageId: undefined,

  layers: [
    {
      name: "draw",
      color: "#111",
    },
    {
      name: "cursor",
      color: "#3ee",
    },
    {
      name: "dynamic",
      color: "#5f5",
    },
    {
      name: "select",
      color: "#22e",
      lineDash: [10, 10],
    },
  ],
  pages: [],
};

const projectReducer = (state = initialState, action) => {
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

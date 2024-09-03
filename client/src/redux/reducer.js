import {
  GET_DRIVERS,
  GET_DRIVERS_BY_ID,
  CREATE_DRIVER,
  GET_TEAMS,
  SET_LOADING,
  SET_CURRENT_PAGE,
  SET_SEARCH_TERM,
} from "./actions";

const initialState = {
  drivers: [],
  teams: [],
  loading: false,
  currentPage: 1,
  searchTerm: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case GET_DRIVERS:
      return {
        ...state,
        loading: false,
        drivers: action.payload,
      };

    case GET_DRIVERS_BY_ID:
      return {
        ...state,
        loading: false,
        driver: action.payload,
      };

    case CREATE_DRIVER:
      return {
        ...state,
        drivers: [...state.drivers, action.payload],
      };

    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;

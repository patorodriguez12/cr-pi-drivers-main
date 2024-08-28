import { GET_DRIVERS, GET_DRIVERS_BY_ID, SET_LOADING } from "./actions";

const initialState = {
  drivers: [],
  loading: false,
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
        drivers: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;

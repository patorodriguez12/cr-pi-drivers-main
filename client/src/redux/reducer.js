import { GET_DRIVERS, GET_DRIVERS_BY_ID } from "./actions";

const initialState = {
  drivers: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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

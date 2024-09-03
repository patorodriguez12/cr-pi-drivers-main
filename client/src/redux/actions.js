import axios from "axios";

export const GET_DRIVERS = "GET_DRIVERS";
export const GET_DRIVERS_BY_ID = "GET_DRIVERS_BY_ID";
export const CREATE_DRIVER = "CREATE_DRIVER";
export const GET_TEAMS = "GET_TEAMS";
export const SET_LOADING = "SET_LOADING";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

const URL = "http://localhost:3001";

export const setLoading = (isLoading) => {
  return { type: SET_LOADING, payload: isLoading };
};

export const setCurrentPage = (pageNumber) => ({
  type: SET_CURRENT_PAGE,
  payload: pageNumber,
});

export const setSearchTerm = (searchTerm) => {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm,
  };
};

// GET DRIVERS
export const getDrivers = (
  driverName,
  driverTeams,
  driverNationality,
  dobSort
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/drivers`, {
        filters: {
          forename_filter: driverName || "",
          teams_filter: driverTeams || "",
          nationality_filter: driverNationality || "",
          dob_order: dobSort || "",
        },
        page: 1,
        itemsPerPage: 100,
      });
      return dispatch({
        type: GET_DRIVERS,
        payload: response.data.drivers,
      });
    } catch (error) {
      console.error(`Error getting drivers: ${error}`);
    }
  };
};

// GET DRIVER BY ID
export const getDriverById = (driverID) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/drivers`, {
        filters: {
          id_filter: driverID,
        },
        page: 1,
        itemsPerPage: 50,
      });
      console.log(response.data.drivers[0]);
      return dispatch({
        type: GET_DRIVERS_BY_ID,
        payload: response.data.drivers,
      });
    } catch (error) {
      console.error(`Error getting driver detail: ${error}`);
    }
  };
};

// CREATE DRIVER
export const createDriver = (driverData) => {
  return async (dispatch) => {
    try {
      console.log(driverData);
      const response = await axios.post(`${URL}/drivers/create`, driverData);
      dispatch({
        type: CREATE_DRIVER,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Error creating driver: ${error}`);
    }
  };
};

// GET TEAMS
export const getTeams = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/teams");
      dispatch({
        type: GET_TEAMS,
        payload: response.data.teams,
      });
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
};

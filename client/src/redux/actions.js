import axios from "axios";
import {
  GET_DRIVERS,
  SET_TOTAL_PAGE,
  SET_PAGE,
  SEARCH_DRIVERS,
  GET_TEAMS,
  CREATE_DRIVER,
  FILTER_BY_TEAM,
  FILTER_BY_ORIGIN,
  SORT_ORDER,
  UPDATE_ORDER,
  CLEAN_FILTER,
  SET_CLEAN,
  UPDATE_SORTED_LIST_BY_DATE,
  TOGGLE_SORT_ORDER_BY_DATE,
} from "./actionType";

const URL = "http://localhost:3001";

// Accion para consultar todos los drivers
export function allDrivers() {
  return async function (dispatch) {
    const service = await axios(URL + "/drivers");
    const allDriversData = service.data;

    dispatch({
      type: GET_DRIVERS,
      payload: allDriversData,
    });

    dispatch(setTotalPage());
  };
}

// Accion para consultar teams
export function allTeams() {
  return async function (dispatch) {
    const service = await axios(URL + "/teams");
    const allTeamsData = service.data;

    dispatch({
      type: GET_TEAMS,
      payload: allTeamsData,
    });
  };
}

// Acción para buscar por nombre
export function onSearchName(name) {
  return async function (dispatch) {
    try {
      // Realizar la búsqueda por nombre
      const response = await axios.get(`${URL}/drivers?name=${name}`);

      dispatch({
        type: SEARCH_DRIVERS,
        payload: response.data, // Asume que la API devuelve los resultados
      });
    } catch (error) {
      console.error("Cannot find by name:", error);
    } finally {
      dispatch(setTotalPage());
    }
  };
}

// Accion para crear un nuevo driver
export function createNewDriver(payload) {
  return async function (dispatch) {
    try {
      const service = await axios.post(URL + "/drivers", payload);

      dispatch({
        type: CREATE_DRIVER,
        payload,
      });

      if (service.status === 201) {
        alert("Successfully created");
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Driver already exists");
      } else if (error.response.status === 404) {
        alert("Internal server error");
      }
    }
  };
}


// Accion para filtrar por teams
export function filteredByTeam(option) {
  return (dispatch) => {
    dispatch({
      type: FILTER_BY_TEAM,
      payload: option,
    });

    dispatch(setTotalPage());
  };
}

// Accion para definir el total de las paginas
export function setTotalPage() {
  return {
    type: SET_TOTAL_PAGE,
  };
}

// Accion para definir la pagina actual
export const setPage = (pageNumber) => ({
  type: SET_PAGE,
  payload: pageNumber,
});

// Accion para filtrar por origen
export function filterByOrigin(option) {
  return (dispatch) => {
    dispatch({
      type: FILTER_BY_ORIGIN,
      payload: option,
    });

    dispatch(setTotalPage());
  };
}

// Accion para definir ordenamiento
export const toggleSortOrder = () => ({
  type: SORT_ORDER,
});

// Accion para actualizar ordenamiento
export const updateSortedList = (sortedList) => ({
  type: UPDATE_ORDER,
  payload: sortedList,
});

// Accion para actualizar el estado de limpieza
export function setClean(isClean) {
  return {
    type: SET_CLEAN,
    payload: isClean,
  };
}

// Accion para limpiar filtros
export function cleanFilter() {
  return async function (dispatch) {
    try {
      dispatch(setClean(true));

      dispatch({
        type: CLEAN_FILTER,
      });

      dispatch(setTotalPage());

      await new Promise((resolve) => setTimeout(resolve, 1000));

      dispatch(setClean(false));
    } catch (error) {
      console.log(error);
    }
  };
}

// Acción para alternar el orden de fecha de nacimiento (ascendente o descendente)
export const toggleSortOrderByDate = () => ({
  type: TOGGLE_SORT_ORDER_BY_DATE,
});

// Acción para actualizar la lista ordenada por fecha de nacimiento
export const updateSortedListByDate = (sortedList) => ({
  type: UPDATE_SORTED_LIST_BY_DATE,
  payload: sortedList,
});

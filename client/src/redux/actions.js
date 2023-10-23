import axios from 'axios';
import { GET_DRIVERS,
    SET_TOTAL_PAGE,
    SET_PAGE,
    SEARCH_DRIVERS,
    SET_LOADING,
    GET_TEAMS,
    CREATE_DRIVER,
    FILTER_BY_TEAM,
    FILTER_BY_ORIGIN,
    SORT_ORDER,
    UPDATE_ORDER,
    CLEAN_FILTER,
    SET_CLEAN } from "./actionType";

const URL = "http://localhost:3001";

// Accion para consultar todos los drivers
export function allDrivers() {
    return async function (dispatch) {
        const service = await axios(URL + "/drivers")
        const allDriversData = service.data
        
        // console.log("Data from backend:", allDriversData);

        dispatch({
            type: GET_DRIVERS,
            payload: allDriversData
        })

        dispatch(setTotalPage())
    }
};

// Accion para definir el total de las paginas
export function setTotalPage() {
    return {
        type: SET_TOTAL_PAGE
    };
};

// Accion para definir la pagina actual
export const setPage = (pageNumber) => ({
    type: SET_PAGE,
    payload: pageNumber,
});

// Acción para buscar por nombre
export function onSearchName(name) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true)); // Activar el indicador de carga

            // Realizar la búsqueda por nombre
            const response = await axios.get(`${URL}/drivers?name=${name}`);

            dispatch({
                type: SEARCH_DRIVERS,
                payload: response.data, // Asume que la API devuelve los resultados
            });
        } catch (error) {
            console.error('Error al buscar por nombre:', error);
        } finally {
            dispatch(setLoading(false)); // Desactivar el indicador de carga
        }
    }
}

// Acción para buscar por ID
// Acción para buscar por ID
export function onSearchId(id) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true)); // Activar el indicador de carga

            // Realizar la búsqueda por ID
            const response = await axios.get(`${URL}/drivers/${id}`);

            dispatch({
                type: SEARCH_DRIVERS,
                payload: response.data, // Asume que la API devuelve los resultados
            });
        } catch (error) {
            console.error('Error al buscar por ID:', error);
        } finally {
            dispatch(setLoading(false)); // Desactivar el indicador de carga
        }
    }
}




// Accion para actualizar el estado de carga
export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload:isLoading,
});

// Accion para consultar teams
export function allTeams() {
    return async function (dispatch) {
      try {
        const response = await axios.get('http://localhost:3001/teams');
        const teams = response.data;
        dispatch({ type: 'FETCH_TEAMS_SUCCESS', payload: teams });
      } catch (error) {
        dispatch({ type: 'FETCH_TEAMS_ERROR', error });
      }
    }
  }

// Accion para crear un nuevo driver
export function createNewDriver(payload) {
    return async function (dispatch) {
        try {
            const service = await axios.post(URL, payload)

            dispatch({
                type: CREATE_DRIVER,
                payload,
            });

            if (service.status === 201) {
                return alert('Driver succesfully created')
            }
        } catch (error) {
            if (error.response.status === 400) {
                return alert('Driver already exists')
            }
            if (error.response.status === 404) {
                return alert('Internal server error')
            }
        }
    }
}

// Accion para filtrar por origen
export function filterByOrigin(option) {
    return (dispatch) => {
        dispatch({
            type: FILTER_BY_ORIGIN,
            payload: option,
        });

        dispatch(setTotalPage())
    }
}

// Accion para filtrar por teams
export function filteredByTeam(option) {
    return (dispatch) => {
    }
}

// Accion para definir ordenamiento
export const toggleSortOrder = () => ({
    type: SORT_ORDER,
})

// Accion para actualizar ordenamiento
export const updateSortedList = (sortedList) => ({
    type: UPDATE_ORDER,
    payload: sortedList,
})

// Accion para actualizar el estado de limpieza
export function setClean(isClean) {
    return {
        type: SET_CLEAN,
        payload: isClean
    }
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

            await new Promise(resolve => setTimeout(resolve, 1000))

            dispatch(setClean(false));
        } catch (error) {
            console.log(error)
        }
    }
}

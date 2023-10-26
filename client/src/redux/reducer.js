import {
  GET_DRIVERS,
  GET_TEAMS,
  SEARCH_DRIVERS,
  SET_TOTAL_PAGE,
  SET_PAGE,
  SET_LOADING,
  FILTER_BY_TEAM,
  FILTER_BY_ORIGIN,
  SORT_ORDER,
  UPDATE_ORDER,
  CLEAN_FILTER,
  SET_CLEAN,
} from "./actionType";

const initialState = {
  allDrivers: [],
  allTeams: [],
  filteredData: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  isClean: false,
  sortOrder: "asc",
};

export default function rootReducer(state = initialState, { type, payload }) {
  console.log("Reducer called with action type:", type);
  console.log("Current state:", state);

  switch (type) {
    case GET_DRIVERS: // reducer para actualizar todos los drivers
      return {
        ...state,
        allDrivers: payload,
        filteredData: payload,
        sortOrder: "asc",
      };
    case SET_TOTAL_PAGE: // reducer para actualizar total de páginas
      return {
        ...state,
        totalPages: Math.ceil(state.filteredData.length / 9),
      };
    case SET_PAGE: // reducer para actualizar página actual
      return {
        ...state,
        currentPage: payload,
      };
    case SEARCH_DRIVERS: // reducer para actualizar resultados de la búsqueda
      return {
        ...state,
        filteredData: payload,
      };
    case SET_LOADING: // reducer para actualizar el estado de carga
      return {
        ...state,
        isLoading: payload,
      };
    case GET_TEAMS: // reducer para actualizar los equipos
      return {
        ...state,
        allTeams: payload,
      };
    case FILTER_BY_TEAM: // reducer para filtrar por equipo
    const teamName = payload; // Supongo que payload es el nombre del equipo seleccionado
    let filteredDriversDataTeam;
  
    if (teamName === '') {
      // Si no se ha seleccionado un equipo, muestra todos los controladores
      filteredDriversDataTeam = state.allDrivers;
    } else {
      // Filtra los controladores por el nombre del equipo seleccionado
      filteredDriversDataTeam = state.allDrivers.filter((driver) =>
        driver.teams.includes(teamName)
      );
    }
  
    return {
      ...state,
      currentPage: 1,
      filteredData: filteredDriversDataTeam,
      sortOrder: "asc",
    };
    case FILTER_BY_ORIGIN: // reducer para filtrar por origen
      const filterOrigin = payload;
      let filteredDriversDataOrigin; // Cambio de nombre de la variable

      if (filterOrigin === "all") {
        return {
          ...state,
          currentPage: 1,
          filteredData: state.allDrivers,
        };
      }

      if (filterOrigin === "api") {
        filteredDriversDataOrigin = state.allDrivers.filter(
          (driver) => !driver.created
        );
      } else if (filterOrigin === "db") {
        filteredDriversDataOrigin = state.allDrivers.filter(
          (driver) => driver.created
        );
      } else {
        filteredDriversDataOrigin = [];
      }

      return {
        ...state,
        currentPage: 1,
        filteredData: filteredDriversDataOrigin,
        sortOrder: "asc",
      };
    case SORT_ORDER:
      const newSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      const sortedList = [...state.filteredData];
      sortedList.sort((a, b) => {
        if (newSortOrder === "asc") {
          return a.name.forename.localeCompare(b.name.forename);
        } else {
          return b.name.forename.localeCompare(a.name.forename);
        }
      });

      return {
        ...state,
        sortOrder: newSortOrder,
        filteredData: sortedList,
      };
    case UPDATE_ORDER: // reducer para actualizar orden
      return {
        ...state,
        sortedList: payload,
      };
    case SET_CLEAN: //reducer para actualizar estado de limpieza
      return {
        ...state,
        isClean: payload,
      };
    case CLEAN_FILTER: // reducer para limpiar filtros
      return {
        ...state,
        filteredData: state.allDrivers,
        sortOrder: "asc",
      };
    default:
      return state;
  }
}

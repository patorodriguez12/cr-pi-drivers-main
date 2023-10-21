import { GET_DRIVERS,
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
    SET_CLEAN } from "./actionType";

const initialState = {
    allDrivers: [],
    allTeams: [],
    filteredData: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    isClean: false,
    sortOrder: "asc",
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_DRIVERS: // reducer para actualizar todos los drivers
            return {
                ...state,
                allDrivers: payload,
                filteredData: payload,
                sortOrder: "asc"
            };
        case SET_TOTAL_PAGE: // reducer para actualizar total de páginas
            return {
                ...state,
                totalPages: Math.ceil(state.filteredData.length / 9)
            };
        case SET_PAGE: // reducer para actualizar pagina actual
            return {
                ...state,
                currentPage: payload
            };
        case SEARCH_DRIVERS: // reducer para actualizar resultados de la busqueda
            return {
                ...state,
                filteredData: payload
            };
        case SET_LOADING: // reducer para actualizar el estado de carga
            return {
                ...state,
                isLoading: payload
            }
        case GET_TEAMS: // reducer para actualizar los teams
            return {
                ...state,
                allTeams: payload
            }
        case FILTER_BY_ORIGIN: { // reducer para filtrar por origen
            const filterOrigin = payload;
            let filteredDriversData;

            if (filterOrigin === 'all') {
                return {
                    ...state,
                    currentPage: 1,
                    filteredData: state.allDrivers,
                };
            }

            if (filterOrigin === 'api') {
                filteredDriversData = state.allDrivers.filter((driver) => !driver.created);
            } else if (filterOrigin === 'db') {
                filteredDriversData = state.allDrivers.filter((dog) => driver.created);
            } else {
                filteredDriversData = [];
            }
            
            return {
                ...state,
                currentPage: 1,
                filteredData: filteredDriversData,
                setOrder: "asc"
            };
        }
        case FILTER_BY_TEAM: { // reducer para filtrar por equipo
            const filterTeam = payload;
            let filteredDriversData;

            if (filterTeam === 'all') {
                return {
                    ...state,
                    currentPage: 1,
                    filteredData: state.allDrivers,
                };
            }

            filteredDriversData = state.allDrivers.filter((driver) => driver.team && driver.team.includes(filterTeam));

            return {
                ...state,
                currentPage: 1,
                filteredData: filteredDriversData,
                setOrder: "asc"
            };
        }
        case SORT_ORDER: { // reducer para el ordenamiento
            const newSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
            const sortedList = [...state.filteredData];
            sortedList.sort((a, b) => {
                if (a.name && b.name) {
                    if (newSortOrder === "asc") {
                        return a.name.localeCompare(b.name);
                    } else {
                        return b.name.localeCompare(a.name);
                    }
                } else {
                    // Manejo de caso en el que a.name o b.name no están definidos
                    return 0;
                }
            });

            return {
                ...state,
                sortOrder: newSortOrder,
                filteredData: sortedList,
            };
        }
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
                sortOrder: 'asc',
            };
        default:
            return state;
    }
}
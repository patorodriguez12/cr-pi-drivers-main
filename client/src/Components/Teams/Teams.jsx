import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allTeams, filteredByTeam } from '../../redux/actions'; // Actualiza la importación

export default function Teams() {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.allTeams); // Obtiene los equipos desde el estado
  const filteredDrivers = useSelector((state) => state.filteredData);

  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    dispatch(allTeams()); // Llama a la acción para obtener los equipos
  }, [dispatch]);

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
    dispatch(filteredByTeam(team)); // Llama a la acción para filtrar por equipo
  };

  return (
    <div>
      {teams && teams.length > 0 ? (
        <select onChange={(e) => handleTeamChange(e.target.value)}>
          <option value="">Selecciona un equipo</option>
          {teams.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </select>
      ) : (
        <p>Cargando equipos...</p>
      )}
    </div>
  );
}

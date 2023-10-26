import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allTeams, filteredByTeam } from "../../redux/actions";

export default function Teams() {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.allTeams);
  const filteredDrivers = useSelector((state) => state.filteredData);

  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    dispatch(allTeams());
  }, [dispatch]);

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
    dispatch(filteredByTeam(team));
  };

  return (
    <div>
      {teams && teams.length > 0 ? (
        <select onChange={(e) => handleTeamChange(e.target.value)}>
          <option value="">Selecciona un equipo</option>
          {teams.map((team, index) => (
            <option key={index} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      ) : (
        <p>Cargando equipos...</p>
      )}
      {selectedTeam && (
        <div>
          <h2>Corredores del equipo: {selectedTeam}</h2>
          <ul>
            {filteredDrivers.map((driver) => (
              <li key={driver.id}>
                {driver.name.forename} {driver.name.surname}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filteredByTeam } from "../../redux/actions";

export default function Teams() {
  const teams = useSelector((state) => state.allTeams);
  const isLoading = useSelector((state) => state.isLoading);
  const clean = useSelector((state) => state.isClean);

  const dispatch = useDispatch();
  const [selectedTeam, setSelectedTeam] = useState("all");

  useEffect(() => {
    if (clean) {
      setSelectedTeam("all");
    }
  }, [clean]);

  const handleOptionSelect = (event) => {
    const option = event.target.value;
    setSelectedTeam(option);
    dispatch(filteredByTeam(option));
  };

  return (
    <div>
      Teams:{" "}
      {isLoading ? (
        "Loading..."
      ) : (
        <select value={selectedTeam} onChange={handleOptionSelect}>
          <option value="all">All</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option> // Cambiar cómo accedes a los datos
          ))}
        </select>
      )}
    </div>
  );
}

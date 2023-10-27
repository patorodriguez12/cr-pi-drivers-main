import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filteredByTeam } from "../../../../redux/actions";

export default function SortByTeam() {
  const teams = useSelector((state) => state.allTeams);
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
      Teams:
      <select value={selectedTeam} onChange={handleOptionSelect}>
        <option value="all">All</option>
        {teams.map((team) => (
          <option value={team} key={team}>{team}</option>
        ))}
      </select>
    </div>
  );
}

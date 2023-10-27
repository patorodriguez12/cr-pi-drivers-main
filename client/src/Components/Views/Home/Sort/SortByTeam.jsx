import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filteredByTeam } from "../../../../redux/actions";
import style from "./Sorts.module.css";

export default function SortByTeam() {
  const teams = useSelector((state) => state.allTeams);
  const dispatch = useDispatch();
  const [selectedTeam, setSelectedTeam] = useState("all");

  const handleOptionSelect = (event) => {
    const option = event.target.value;
    setSelectedTeam(option);
    dispatch(filteredByTeam(option));
  };

  return (
    <div>
      <label className={style.text}>Teams: </label>
      <select value={selectedTeam} onChange={handleOptionSelect}>
        <option value="all">All</option>
        {teams.map((team) => (
          <option value={team} key={team}>
            {team}
          </option>
        ))}
      </select>
    </div>
  );
}

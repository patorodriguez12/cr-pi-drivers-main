import React from "react";
import FilterByAZ from "../Filters/FilterByAZ";
import FilterByDate from "../Filters/FilterByDate";
import FilterByOrigin from "../Filters/FilterByOrigin";
import FilterByTeam from "../Filters/FilterByTeam";
import style from "./Sidebar.css";

function Sidebar() {
  return (
    <div>
      <section className="sidebar">
        <FilterByAZ />
        <FilterByDate />
        <FilterByOrigin />
        <FilterByTeam />
      </section>
    </div>
  );
}

export default Sidebar;

import React from "react";
import Filters from "../Filters/Filters";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div>
      <section className="sidebar">
        <Filters />
      </section>
    </div>
  );
}

export default Sidebar;

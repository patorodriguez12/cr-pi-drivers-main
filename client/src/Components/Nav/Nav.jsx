import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Nav.css";

function Nav({ setCurrentPage }) {
  return (
    <div className="nav">
      <Link to={`/`}>
        <button>🡰</button>
      </Link>
      <SearchBar setCurrentPage={setCurrentPage}/>
      <Link to={`/create`}>
        <button>Create new driver</button>
      </Link>
    </div>
  );
}

export default Nav;

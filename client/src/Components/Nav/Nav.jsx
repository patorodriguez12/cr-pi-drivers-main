import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.css";

function Nav() {
  return (
    <div className="nav">
      <Link to={`/`}>
        <button>🡰</button>
      </Link>
      <SearchBar />
      <Link to={`/create`}>
        <button>Create new driver</button>
      </Link>
    </div>
  );
}

export default Nav;

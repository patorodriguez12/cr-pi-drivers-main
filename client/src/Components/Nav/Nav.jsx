import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Form from "../../Pages/Form/Form";
import "./Nav.css";

function Nav({ setCurrentPage }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="nav">
      <Link to={`/`}>
        <button>🡰</button>
      </Link>
      <SearchBar setCurrentPage={setCurrentPage} />
      <button onClick={toggleForm}>Create new driver</button>
      {isFormOpen && <Form closeForm={toggleForm} />}
    </div>
  );
}

export default Nav;

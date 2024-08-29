import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDrivers } from "../../redux/actions";
import "./SearchBar.css";

function SearchBar({ setCurrentPage }) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    dispatch(getDrivers(value));
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Enter driver's name"
        className="input"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;

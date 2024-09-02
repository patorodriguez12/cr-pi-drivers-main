import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDrivers, setCurrentPage, setSearchTerm } from "../../redux/actions";
import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const searchTerm  = event.target.value;
    setSearchTerm(searchTerm);
    dispatch(setCurrentPage(1));
    dispatch(getDrivers(searchTerm));
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Enter driver's name"
        className="input"
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;

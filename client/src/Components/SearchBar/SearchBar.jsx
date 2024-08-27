import React from 'react';
import style from './SearchBar.css';

function SearchBar() {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Enter driver's name"
        className="input"
      />
      <button className="button">
        <span className="searchIcon"></span>
      </button>
    </div>
  );
}

export default SearchBar;


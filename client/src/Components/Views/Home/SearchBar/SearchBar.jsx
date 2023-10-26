import React, { useState } from 'react';
import { connect } from 'react-redux';
import { cleanFilter, onSearchName, setPage } from '../../../../redux/actions';
import style from './SearchBar.module.css'; // Agrega tu archivo CSS

function SearchBar({ cleanFilter, onSearchName, setPage, isLoading, currentPage }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm) {
      onSearchName(searchTerm);
      setPage(1);
    }
  };

  const handleReset = () => {
    cleanFilter();
    setPage(1);
  };

  return (
    <div className={style.searchBar}>
      <input
        type="text"
        placeholder="Enter driver's name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={style.input} // Aplica estilos al input
      />
      <button onClick={handleSearch} className={style.button}>Search</button>
      <button onClick={handleReset} className={style.button}>Clear</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  currentPage: state.currentPage,
});

const mapDispatchToProps = {
  cleanFilter,
  onSearchName,
  setPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
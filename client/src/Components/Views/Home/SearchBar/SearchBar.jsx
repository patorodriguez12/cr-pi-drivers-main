import React, { useState } from 'react';
import { connect } from 'react-redux';
import { onSearchName, setPage, setTotalPage } from '../../../../redux/actions';
import style from './SearchBar.module.css';

function SearchBar({ onSearchName, setPage, setTotalPage, currentPage }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm) {
      onSearchName(searchTerm);
      setPage(1);
  
      // Calcula el nuevo total de páginas después de la búsqueda
      setTotalPage();  // Esto debe reflejar los resultados filtrados
    }
  };

  return (
    <div className={style.searchBar}>
      <input
        type="text"
        placeholder="Enter driver's name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={style.input}
      />
      <button onClick={handleSearch} className={style.button}>
        <span className={style.searchIcon}></span>
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
});

const mapDispatchToProps = {
  onSearchName,
  setPage,
  setTotalPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);


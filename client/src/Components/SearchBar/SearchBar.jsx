import React, { useState } from 'react';
import { connect } from 'react-redux';
import { onSearchName, setPage, setTotalPage } from '../../redux/actions';
import style from './SearchBar.css';

function SearchBar({ onSearchName }) {
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
    <div className="searchBar">
      <input
        type="text"
        placeholder="Enter driver's name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />
      <button onClick={handleSearch} className="button">
        <span className="searchIcon"></span>
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
});

const mapDispatchToProps = {
  onSearchName,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);


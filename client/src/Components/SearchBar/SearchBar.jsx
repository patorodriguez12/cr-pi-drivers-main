import React, { useState } from 'react';
import { connect } from 'react-redux';
import { cleanFilter, onSearchName, onSearchId, setPage } from '../../redux/actions';

function SearchBar({ cleanFilter, onSearchName, onSearchId, setPage, isLoading, currentPage }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Si la búsqueda no está vacía, determina si es un número (id) o una cadena (name)
    if (searchTerm) {
      const searchValue = isNaN(searchTerm) ? searchTerm : parseInt(searchTerm, 10);

      if (isNaN(searchValue)) {
        // Búsqueda por name
        onSearchName(searchTerm);
      } else {
        // Búsqueda por id
        onSearchId(searchValue);
      }

      // Reinicia la página a la primera página
      setPage(1);
    }
  };

  const handleReset = () => {
    // Limpia el filtro de búsqueda y reinicia la página
    cleanFilter();
    setPage(1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search driver by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleReset}>Clean</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading, // Asegúrate de que isLoading sea un estado válido en tu Redux
  currentPage: state.currentPage, // Asegúrate de que currentPage sea un estado válido en tu Redux
});

const mapDispatchToProps = {
  cleanFilter,
  onSearchName,
  onSearchId,
  setPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
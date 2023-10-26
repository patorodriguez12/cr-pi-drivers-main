import React, { useState } from 'react';
import { connect } from 'react-redux';
import { cleanFilter, onSearchName, setPage } from '../../redux/actions';

function SearchBar({ cleanFilter, onSearchName, setPage, isLoading, currentPage }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Si la búsqueda no está vacía, busca por nombre
    if (searchTerm) {
      onSearchName(searchTerm);

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
        placeholder="Buscar por Nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <button onClick={handleReset}>Limpiar</button>
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
  setPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

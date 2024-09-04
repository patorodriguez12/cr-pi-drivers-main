import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDrivers } from '../../redux/actions'; // Asegúrate de que la ruta sea correcta

function Filters() {
  const [driverName, setDriverName] = useState('');
  const [driverTeams, setDriverTeams] = useState('');
  const [driverNationality, setDriverNationality] = useState('');
  const [dobSort, setDobSort] = useState('');

  const dispatch = useDispatch();

  const handleFilterChange = () => {
    dispatch(getDrivers(driverName, driverTeams, driverNationality, dobSort));
  };

  return (
    <div className="filters-container">
      <h2>Filters</h2>
      <div className="filter-group">
        <label>Driver Name:</label>
        <input
          type="text"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Teams:</label>
        <input
          type="text"
          value={driverTeams}
          onChange={(e) => setDriverTeams(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Nationality:</label>
        <input
          type="text"
          value={driverNationality}
          onChange={(e) => setDriverNationality(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Date of Birth Sort Order:</label>
        <select
          value={dobSort}
          onChange={(e) => setDobSort(e.target.value)}
        >
          <option value="">Select Sort Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
}

export default Filters;

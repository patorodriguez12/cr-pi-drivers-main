// src/components/Filters/Filters.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDrivers } from '../../redux/actions';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
} from '@mui/material';

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
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Filtros
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nombre del Piloto"
          variant="outlined"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Equipos"
          variant="outlined"
          value={driverTeams}
          onChange={(e) => setDriverTeams(e.target.value)}
          fullWidth
        />
        <TextField
          label="Nacionalidad"
          variant="outlined"
          value={driverNationality}
          onChange={(e) => setDriverNationality(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="dob-sort-label">Ordenar por Fecha de Nacimiento</InputLabel>
          <Select
            labelId="dob-sort-label"
            value={dobSort}
            label="Ordenar por Fecha de Nacimiento"
            onChange={(e) => setDobSort(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccione Orden</em>
            </MenuItem>
            <MenuItem value="asc">Ascendente</MenuItem>
            <MenuItem value="desc">Descendente</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleFilterChange}>
          Aplicar Filtros
        </Button>
      </Box>
    </Box>
  );
}

export default Filters;

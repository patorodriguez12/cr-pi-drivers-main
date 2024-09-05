import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, getTeams } from "../../redux/actions";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Chip,
  Grid2,
} from "@mui/material";

function Filters() {
  const [driverName, setDriverName] = useState("");
  const [driverTeams, setDriverTeams] = useState([]);
  const [driverNationality, setDriverNationality] = useState("");
  const [dobSort, setDobSort] = useState("");

  const dispatch = useDispatch();
  const teamsData = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const handleFilterChange = () => {
    // Convert array of selected teams to comma-separated string
    const teamsString = driverTeams.join(", ");
    dispatch(getDrivers(driverName, teamsString, driverNationality, dobSort));
  };

  const handleTeamChange = (event) => {
    setDriverTeams(event.target.value);
  };

  return (
    <Grid2 width={200}>
      <Typography variant="h5" gutterBottom>
        Filtros
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl>
          <InputLabel id="team-select">Seleccione los equipos</InputLabel>
          <Select
            labelId="team-select"
            multiple
            value={driverTeams}
            onChange={handleTeamChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {teamsData.map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Nacionalidad"
          variant="outlined"
          value={driverNationality}
          onChange={(e) => setDriverNationality(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="dob-sort-label">
            Ordenar por Fecha de Nacimiento
          </InputLabel>
          <Select
            labelId="dob-sort-label"
            value={dobSort}
            onChange={(e) => setDobSort(e.target.value)}
            label="Ordenar por Fecha de Nacimiento"
          >
            <MenuItem value="">
              <em>Seleccione Orden</em>
            </MenuItem>
            <MenuItem value="asc">Ascendente</MenuItem>
            <MenuItem value="desc">Descendente</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterChange}
        >
          Aplicar Filtros
        </Button>
      </Box>
    </Grid2>
  );
}

export default Filters;

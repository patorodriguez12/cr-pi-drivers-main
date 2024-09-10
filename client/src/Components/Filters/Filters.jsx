import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, getTeams } from "../../redux/actions";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Chip,
  Grid2,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function Filters({ onApplyFilters }) {
  const [driverName, setDriverName] = useState("");
  const [driverTeams, setDriverTeams] = useState([]);
  const [driverNationality, setDriverNationality] = useState("");
  const [dobSort, setDobSort] = useState("");
  const [driverOrigin, setDriverOrigin] = useState(null);

  const dispatch = useDispatch();
  const teamsData = useSelector((state) => state.teams);
  const driversData = useSelector((state) => state.drivers);

  // Extrae las nacionalidades únicas y las ordena
  const nationalitiesData = [
    ...new Set(driversData.map((driver) => driver.nationality)),
  ].sort();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const handleFilterChange = () => {
    const teamsString = driverTeams.join(", ");
    dispatch(
      getDrivers(
        driverName,
        teamsString,
        driverNationality,
        dobSort,
        driverOrigin
      )
    );
  };

  const handleTeamChange = (event) => {
    const {
      target: { value },
    } = event;
    setDriverTeams([...driverTeams, value]);
  };

  const handleDeleteTeam = (teamToDelete) => {
    setDriverTeams(driverTeams.filter((team) => team !== teamToDelete));
  };

  const handleNationalityChange = (event) => {
    setDriverNationality(event.target.value);
  };

  const handleClearFilters = () => {
    setDriverName("");
    setDriverTeams([]);
    setDriverNationality("");
    setDobSort("");
    setDriverOrigin(null);
    dispatch(getDrivers("", "", "", "", null, 1));
  };

  const isApplyDisabled =
    !driverName &&
    driverTeams.length === 0 &&
    !driverNationality &&
    !dobSort &&
    driverOrigin === null;

  return (
    <Grid2
      width={isMobile ? "100%" : 300}
      padding={2}
      sx={{ overflow: "hidden" }}
    >
      <Typography variant="h5" gutterBottom>
        Filters
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="team-select">Select teams</InputLabel>
          <Select
            labelId="team-select"
            onChange={handleTeamChange}
            renderValue={() => null}
            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }} // Opcional: limita la altura del menú
            label="Select teams"
          >
            {teamsData.map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Mostrar los equipos seleccionados debajo del select */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, marginTop: 2 }}>
          {driverTeams.map((team) => (
            <Chip
              key={team}
              label={team}
              onDelete={() => handleDeleteTeam(team)}
              sx={{ marginBottom: 1 }}
            />
          ))}
        </Box>
        <FormControl fullWidth>
          <InputLabel id="nationality-select">Select nationality</InputLabel>
          <Select
            labelId="nationality-select"
            value={driverNationality}
            onChange={handleNationalityChange}
            label="Select nationality"
            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {nationalitiesData.map((nationality) => (
              <MenuItem key={nationality} value={nationality}>
                {nationality}
              </MenuItem>
            ))}
          </Select>
          <Box mt={1}>
            {driverNationality && (
              <Chip
                key={driverNationality}
                label={driverNationality}
                onDelete={() => setDriverNationality("")}
              />
            )}
          </Box>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="dob-sort-label">Sort by date of birth</InputLabel>
          <Select
            labelId="dob-sort-label"
            value={dobSort}
            onChange={(e) => setDobSort(e.target.value)}
            label="Sort by date of birth"
          >
            <MenuItem value="">
              <em>Select sort</em>
            </MenuItem>
            <MenuItem value="asc">Ascendant</MenuItem>
            <MenuItem value="desc">Descendant</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="origin-filter">Sort by origin</InputLabel>
          <Select
            labelId="origin-filter"
            value={driverOrigin}
            onChange={(e) => setDriverOrigin(e.target.value)}
            label="Sort by origin"
          >
            <MenuItem value={null}>
              <em>Select origin</em>
            </MenuItem>
            <MenuItem value={true}>Data Base</MenuItem>
            <MenuItem value={false}>External API</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterChange}
          disabled={isApplyDisabled}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearFilters}
          sx={{ mt: 1 }}
        >
          Clear Filters
        </Button>
      </Box>
    </Grid2>
  );
}

export default Filters;

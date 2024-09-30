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
  Divider,
} from "@mui/material";

function Filters() {
  const [driverName, setDriverName] = useState("");
  const [driverTeams, setDriverTeams] = useState([]);
  const [driverNationality, setDriverNationality] = useState("");
  const [dobSort, setDobSort] = useState("");
  const [driverOrigin, setDriverOrigin] = useState(null);

  const dispatch = useDispatch();
  const teamsData = useSelector((state) => state.teams);
  const driversData = useSelector((state) => state.drivers);
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

  const isClearDisabled =
    !driverName &&
    driverTeams.length === 0 &&
    !driverNationality &&
    !dobSort &&
    driverOrigin === null;

  return (
    <Grid2
      width={isMobile ? "100%" : 275}
      padding={2}
      sx={{ overflow: "hidden", backgroundColor: "#262626", color: "#FFFFFF" }} // Fondo oscuro y texto blanco
    >
      <Typography
        variant="h5"
        gutterBottom
        marginBottom={4}
        sx={{ color: "#E10600", fontWeight: "bold" }} // Título estilo F1 (rojo y negrita)
      >
        Filters
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* TEAM FILTERS */}
        <FormControl fullWidth>
          <InputLabel sx={{ color: "#E10600" }} id="team-select">
            Select teams
          </InputLabel>
          <Select
            labelId="team-select"
            value=""
            onChange={handleTeamChange}
            renderValue={() => null}
            MenuProps={{ PaperProps: { sx: { maxHeight: 300, backgroundColor: "#333333", color: "#FFFFFF" } } }} // Estilo de menú desplegable oscuro
            label="Select Teams"
            sx={{ color: "#FFFFFF" }} // Texto de los filtros
          >
            {teamsData.map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, marginTop: 2 }}>
            {driverTeams.map((team) => (
              <Chip
                key={team}
                label={team}
                sx={{
                  marginBottom: 1,
                  backgroundColor: "#E10600", // Color del chip (rojo F1)
                  color: "#FFF",
                }}
              />
            ))}
          </Box>
        </FormControl>

        <Divider sx={{ backgroundColor: "#E10600", marginY: 2 }} /> {/* Línea roja */}

        {/* NATIONALITY FILTERS */}
        <FormControl fullWidth sx={{ gap: 0.5, marginTop: 2 }}>
          <InputLabel sx={{ color: "#E10600" }} id="nationality-select">
            Select nationality
          </InputLabel>
          <Select
            labelId="nationality-select"
            value={driverNationality}
            onChange={handleNationalityChange}
            MenuProps={{ PaperProps: { sx: { maxHeight: 300, backgroundColor: "#333333", color: "#FFFFFF" } } }}
            label="Select nationality"
            sx={{ color: "#FFFFFF" }}
          >
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
                sx={{
                  backgroundColor: "#E10600",
                  color: "#FFF",
                }}
              />
            )}
          </Box>
        </FormControl>
        <Divider sx={{ backgroundColor: "#E10600", marginY: 2 }} />

        {/* DATE OF BIRTH SORT */}
        <FormControl fullWidth sx={{ gap: 0.5, marginTop: 2 }}>
          <InputLabel sx={{ color: "#E10600" }} id="dob-sort-label">
            Sort by date of birth
          </InputLabel>
          <Select
            labelId="dob-sort-label"
            value={dobSort}
            onChange={(e) => setDobSort(e.target.value)}
            label="Sort by date of birth"
            sx={{ color: "#FFFFFF" }}
          >
            <MenuItem value="asc">Ascendant</MenuItem>
            <MenuItem value="desc">Descendant</MenuItem>
          </Select>
          <Box></Box>
        </FormControl>
        <Divider sx={{ backgroundColor: "#E10600", marginY: 2 }} />

        {/* ORIGIN FILTER */}
        <FormControl fullWidth sx={{ gap: 0.5, marginTop: 2 }}>
          <InputLabel sx={{ color: "#E10600" }} id="origin-filter">
            Sort by origin
          </InputLabel>
          <Select
            labelId="origin-filter"
            value={driverOrigin}
            onChange={(e) => setDriverOrigin(e.target.value)}
            label="Sort by origin"
            sx={{ color: "#FFFFFF" }}
          >
            <MenuItem value={true}>Data Base</MenuItem>
            <MenuItem value={false}>External API</MenuItem>
          </Select>
          <Box></Box>
        </FormControl>
        <Divider sx={{ backgroundColor: "#E10600", marginY: 2 }} />

        {/* APPLY AND CLEAR BUTTONS */}
        <Button
          variant="contained"
          onClick={handleFilterChange}
          disabled={isApplyDisabled}
          sx={{
            backgroundColor: "#E10600",
            "&:hover": { backgroundColor: "#FF1E1E" },
            color: "#FFF",
          }}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          sx={{
            mt: 1,
            borderColor: "#E10600",
            color: "#FFF",
            "&:hover": {
              borderColor: "#FF1E1E",
              backgroundColor: "#333333",
            },
          }}
          disabled={isClearDisabled}
        >
          Clear Filters
        </Button>
      </Box>
    </Grid2>
  );
}

export default Filters;

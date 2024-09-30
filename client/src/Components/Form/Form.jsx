import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createDriver, getTeams } from "../../redux/actions";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  Typography,
  Modal,
} from "@mui/material";
import { validateForm } from "./validations";

function Form({ closeForm }) {
  const teamsData = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const [nationalities, setNationalities] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    description: "",
    teams: [],
  });

  // error handling using validations
  useEffect(() => {
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [formData]);

  // i used countries API to get all nationalities
  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data;

        const nationalitiesList = countries.map((country) => ({
          name: country.name.common,
          demonym: country.demonyms?.eng?.m || country.name.common,
        }));

        nationalitiesList.sort((a, b) => a.name.localeCompare(b.name));

        setNationalities(nationalitiesList);
      } catch (error) {
        console.error("Error fetching nationalities:", error);
      }
    };

    fetchNationalities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "nationality") {
      setSelectedNationality(value);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  // use of getTeams actions
  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const handleTeamClick = (team) => {
    if (!formData.teams.includes(team)) {
      setFormData({
        ...formData,
        teams: [...formData.teams, team],
      });
    }
  };

  const handleRemoveTeam = (team) => {
    setFormData({
      ...formData,
      teams: formData.teams.filter((t) => t !== team),
    });
  };

  // Create button will be disabled if any field is empty or have errors
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        createDriver({ ...formData, teams: formData.teams.join(", ") })
      );
      closeForm();
      window.location.reload();
    } catch (error) {
      setErrors({ submit: "Error creating driver. Please try again." });
    }
  };

  return (
    <Modal open={true} onClose={closeForm}>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "#A9A9A9",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Create New Driver
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={touched.image && !!errors.image}
            helperText={touched.image && errors.image}
            required
          />
          <TextField
            label="Forename"
            name="forename"
            value={formData.forename}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={touched.forename && !!errors.forename}
            helperText={touched.forename && errors.forename}
            required
          />
          <TextField
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={touched.surname && !!errors.surname}
            helperText={touched.surname && errors.surname}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="nationality-label">Select Nationality</InputLabel>
            <Select
              labelId="nationality-label"
              id="nationality"
              name="nationality"
              value={selectedNationality}
              onChange={handleChange}
              label="Select Nationality"
              required
            >
              {nationalities.map((nation) => (
                <MenuItem key={nation.name} value={nation.demonym}>
                  {nation.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={touched.dob && !!errors.dob}
            helperText={touched.dob && errors.dob}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={touched.description && !!errors.description}
            helperText={touched.description && errors.description}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Teams</InputLabel>
            <Select
              label="Teams"
              name="teams"
              value=""
              onChange={(e) => handleTeamClick(e.target.value)}
            >
              {teamsData.map((team, index) => (
                <MenuItem key={index} value={team}>
                  {team}
                </MenuItem>
              ))}
            </Select>
            <Box mt={2}>
              {formData.teams.map((team, index) => (
                <Chip
                  key={index}
                  label={team}
                  onDelete={() => handleRemoveTeam(team)}
                  sx={{ marginRight: 1, marginBottom: 1 }}
                />
              ))}
            </Box>
            {touched.teams && errors.teams && (
              <Typography color="error">{errors.teams}</Typography>
            )}
          </FormControl>
          {errors.submit && (
            <Typography color="error">{errors.submit}</Typography>
          )}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isFormValid}
            >
              Create
            </Button>
            <Button variant="outlined" color="secondary" onClick={closeForm}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default Form;

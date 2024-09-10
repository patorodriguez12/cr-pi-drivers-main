import React, { useState, useEffect } from "react";
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

function Form({ closeForm }) {
  const teamsData = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    image: "",
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    description: "",
    teams: [],
  });

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTeamClick = (team) => {
    setFormData({
      ...formData,
      teams: [...formData.teams, team],
    });
  };

  const handleRemoveTeam = (team) => {
    setFormData({
      ...formData,
      teams: formData.teams.filter((t) => t !== team),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        createDriver({ ...formData, teams: formData.teams.join(", ") })
      );
      closeForm(); // Cierra el formulario si la creación fue exitosa
    } catch (error) {
      setError("Error creating driver. Please try again.");
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
          bgcolor: "background.paper",
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
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Forename"
            name="forename"
            value={formData.forename}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
            fullWidth
            margin="normal"
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
          </FormControl>
          {error && <Typography color="error">{error}</Typography>}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" type="submit">
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

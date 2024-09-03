import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDriver, getTeams } from "../../redux/actions";
import "./Form.css";

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

    if (name === "teams") {
      const selectedTeams = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({
        ...formData,
        teams: selectedTeams,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
      await dispatch(createDriver({
        ...formData,
        teams: formData.teams.join(", "), // Convertir el array a una cadena separada por comas
      }));
      closeForm(); // Cierra el formulario si la creación fue exitosa
    } catch (error) {
      setError("Error creating driver. Please try again.");
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="driver-form">
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Forename:</label>
            <input
              type="text"
              name="forename"
              value={formData.forename}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Surname:</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nationality:</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Date of Birth (dd-mm-yyyy):</label>
            <input
              type="text"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Teams:</label>
            <select
              name="teams"
              onChange={(e) => handleTeamClick(e.target.value)}
            >
              <option value="" disabled selected>Seleccione un equipo</option>
              {teamsData.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <div className="selected-teams">
              {formData.teams.map((team, index) => (
                <div key={index} className="selected-team">
                  {team}
                  <button type="button" onClick={() => handleRemoveTeam(team)}>
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Create Driver</button>
          <button type="button" onClick={closeForm}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;

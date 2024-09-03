import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDriver, getTeams } from "../../redux/actions";
import "./Form.css";

function Form({ closeForm }) {
  const teamsData = useSelector((state) => state.teams);
  const [formData, setFormData] = useState({
    image: "",
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    description: "",
    teams: ""
  });

  useEffect(() => {
    dispatch(getTeams())
  })

  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createDriver(formData));
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
            <input
              type="text"
              name="teams"
              value={formData.teams}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Create Driver</button>
          <button type="button" onClick={closeForm}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
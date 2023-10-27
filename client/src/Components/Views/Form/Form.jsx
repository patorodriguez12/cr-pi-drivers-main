import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Form.module.css";
import validate from "./validator";
import { createNewDriver } from "../../../redux/actions";

export default function Form() {
  const teams = useSelector((state) => state.allTeams);
  const dispatch = useDispatch();

  // Estado del formulario
  const [formData, setFormData] = useState({
    image: "",
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    description: "",
    teams: [],
  });

  // Estado de errores
  const [errors, setErrors] = useState({});

  // Estado que verifica si se esta modificando el formulario
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (formTouched) {
      setErrors(validate(formData));
    }
  }, [formData, formTouched]);

  // Handlers que actualizan el estado del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    const validationErrors = validate({ ...formData, [name]: value });
    setErrors(validationErrors);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormTouched(true);
  };

  const handleTeamChange = (event) => {
    const selectedId = event.target.value;
    if (!formData.teams.includes(selectedId)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        teams: [...prevFormData.teams, selectedId],
      }));
    }
  };

  const handleDropdownToggle = () => {
    const dropdown = document.getElementById("teamsDropdown");
  };

  const handleTeamRemove = (id) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      teams: prevFormData.teams.filter((teamId) => teamId !== id),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let aux = Object.keys(errors);
    if (aux.length === 0) {
      setFormData({
        image: "",
        forename: "",
        surname: "",
        nationality: "",
        dob: "",
        description: "",
        teams: [],
      });
      const validationErrors = validate(formData);
      setErrors(validationErrors);

      const payload = {
        image: formData.image,
        forename: formData.forename,
        surname: formData.surname,
        nationality: formData.nationality,
        dob: formData.dob,
        description: formData.description,
        teams: formData.teams,
      };
      dispatch(createNewDriver(payload));
      setFormTouched(false);
    } else {
      return alert(errors);
    }
  };

  const isSubmitDisabled = Object.keys(errors).length > 0 || !formTouched;

  return (
    <div className={styles.formContainer}>
      <div className={styles.bar}>
        <h1 className={styles.title}>Create a new driver</h1>
        <Link to={`/home`}>
          <button className={styles.back}>✖</button>
        </Link>
      </div>
      <div className={styles.new}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Dentro del formulario */}
          <label>
            Image (url):
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          {errors.image && <span className={styles.error}>{errors.image}</span>}
          <br />
          <label>
            Forename:{" "}
            <input
              type="text"
              key="forename"
              name="forename"
              value={formData.forename}
              onChange={handleChange}
              className={styles.input}
            />{" "}
          </label>
          <span className={styles.error}>
            {errors?.forename && errors.forename}
          </span>
          <br />
          <label>
            Surname:{" "}
            <input
              type="text"
              key="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className={styles.input}
            />{" "}
          </label>
          <span className={styles.error}>
            {errors?.surname && errors.surname}
          </span>
          <br />
          <label>
            Nationality:{" "}
            <input
              type="text"
              key="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className={styles.input}
            />{" "}
          </label>
          <span className={styles.error}>
            {errors?.nationality && errors.nationality}
          </span>
          <br />
          <label>
            Date of birth:
            <input
              type="date"
              key="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <span className={styles.error}>{errors?.dob && errors.dob}</span>
          <br />
          <label>
            Description:{" "}
            <input
              type="text"
              key="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.input}
            />{" "}
          </label>
          <span className={styles.error}>
            {errors?.description && errors.description}
          </span>
          <br />
          <label>
            Teams:
            <div onClick={handleDropdownToggle}>
              <select
                id="teamsDropdown"
                multiple
                value={formData.teams}
                onChange={handleTeamChange}
              >
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
              <div className={styles["selected-values"]}>
                {formData.teams.map((selectedTeam) => (
                  <div key={selectedTeam} className={styles["selected-Team"]}>
                    {selectedTeam}{" "}
                    <button
                      type="button"
                      onClick={() => handleTeamRemove(selectedTeam)}
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <span className={styles.error}>
              {errors?.teams && errors.teams}
            </span>
          </label>
          <br />
          <button type="submit" disabled={isSubmitDisabled}>
            Submit
          </button>
          {isSubmitDisabled && <span>Form is empty or contains errors</span>}
        </form>
      </div>
    </div>
  );
}

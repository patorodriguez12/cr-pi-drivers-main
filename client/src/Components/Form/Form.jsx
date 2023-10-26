import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Form.module.css";
import validate from "./validator";
import { createNewDriver } from "../../redux/actions";

export default function Form() {
  const teams = useSelector((state) => state.allTeams);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    image: "",
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    description: "",
    teams: [], // Inicializar como un arreglo vacío
  });

  const [errors, setErrors] = useState({});

  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (formTouched) {
      setErrors(validate(formData));
    }
  }, [formData, formTouched]);

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
        teams: formData.teams, // El arreglo de strings
      };
      console.log(payload);
      dispatch(createNewDriver(payload));
      setFormTouched(false);
    } else {
      return alert(errors);
    }
  };

  const isSubmitDisabled = Object.keys(errors).length > 0 || !formTouched;

  return (
    <div>
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
              onBlur={handleChange}
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
            />{" "}
          </label>
          <span>{errors?.forename && errors.forename}</span>
          <br />
          <label>
            Surname:{" "}
            <input
              type="text"
              key="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />{" "}
          </label>
          <span>{errors?.surname && errors.surname}</span>
          <br />
          <label>
            Nationality:{" "}
            <input
              type="text"
              key="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />{" "}
          </label>
          <span>{errors?.nationality && errors.nationality}</span>
          <br />
          <label>
            Date of birth:
            <input
              type="date" // Utiliza el tipo "date" en lugar de "text"
              key="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </label>
          <span>{errors?.dob && errors.dob}</span>
          <br />
          <label>
            Description:{" "}
            <input
              type="text"
              key="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />{" "}
          </label>
          <span>{errors?.description && errors.description}</span>
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
            <span>{errors?.teams && errors.teams}</span>
          </label>
          <br />
          {!isSubmitDisabled ? (
            <button type="submit">Send</button>
          ) : (
            <span>Form is empty or contains errors</span>
          )}
        </form>
      </div>
    </div>
  );
}

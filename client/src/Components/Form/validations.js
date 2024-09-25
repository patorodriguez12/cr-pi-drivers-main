export const validateForm = (formData) => {
  let errors = {};

  // Validación de image (campo requerido)
  if (!formData.image.trim()) {
    errors.image = "Image URL is required.";
  }

  // Validación de forename (máximo 15 caracteres)
  if (!formData.forename.trim()) {
    errors.forename = "Forename is required.";
  } else if (formData.forename.length > 15) {
    errors.forename = "Forename must be less than 15 characters.";
  }

  // Validación de surname (máximo 15 caracteres)
  if (!formData.surname.trim()) {
    errors.surname = "Surname is required.";
  } else if (formData.surname.length > 15) {
    errors.surname = "Surname must be less than 15 characters.";
  }

  // Validación de nationality (máximo 15 caracteres)
  if (!formData.nationality.trim()) {
    errors.nationality = "Nationality is required.";
  } else if (formData.nationality.length > 15) {
    errors.nationality = "Nationality must be less than 15 characters.";
  }

  // Validación de dob (campo requerido)
  if (!formData.dob.trim()) {
    errors.dob = "Date of Birth is required.";
  }

  // Validación de description (máximo 100 caracteres)
  if (!formData.description.trim()) {
    errors.description = "Description is required.";
  } else if (formData.description.length > 100) {
    errors.description = "Description must be less than 100 characters.";
  }

  // Validación de teams (al menos un equipo requerido)
  if (formData.teams.length === 0) {
    errors.teams = "At least one team must be selected.";
  }

  return errors;
};

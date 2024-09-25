export const validateForm = (formData) => {
  let errors = {};

  // image validation (must be a link)
  if (!formData.image.trim()) {
    errors.image = "Image URL is required.";
  } else if (!/\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(formData.image)) {
    errors.image =
      "Please provide a valid image URL (jpeg, jpg, png, gif, bmp, webp).";
  }

  // forename validation (2 to 15 characters)
  if (!formData.forename.trim()) {
    errors.forename = "Forename is required.";
  } else if (formData.forename.length > 15) {
    errors.forename = "Forename must be less than 15 characters.";
  } else if (formData.forename.length < 2) {
    errors.forename = "Forename must have at least more than 2 characters.";
  }

  // surname validation (2 to 15 characters)
  if (!formData.surname.trim()) {
    errors.surname = "Surname is required.";
  } else if (formData.surname.length > 15) {
    errors.surname = "Surname must be less than 15 characters.";
  } else if (formData.surname.length < 2) {
    errors.surname = "Surname must have at least more than 2 characters.";
  }

  // nationality validation
  if (!formData.nationality) {
    errors.nationality = "Nationality is required";
  }

  // dob validation
  if (!formData.dob.trim()) {
    errors.dob = "Date of Birth is required.";
  }

  // description validation (20 to 250 characters)
  if (!formData.description.trim()) {
    errors.description = "The description is required.";
  } else if (formData.description.length > 250) {
    errors.description = "The description must be less than 250 characters.";
  } else if (formData.description.length < 20) {
    errors.description = "The description must have at least 20 characters.";
  }

  // teams validation
  if (formData.teams.length === 0) {
    errors.teams = "At least one team must be selected.";
  }

  return errors;
};

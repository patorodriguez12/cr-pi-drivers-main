const regImage = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif)$/i;
const regName = /^[a-zA-Z\s]+$/;

const validate = (formData) => {
    const errors = {};

    if (!regImage.test(formData.image)) {
        errors.image = "Url image is not valid";
    }

    if (!formData.image) {
        errors.image = "Image is required";
    }

    if (!regName.test(formData.forename)) {
        errors.forename = "Forename is not valid";
    }

    if (!formData.forename) {
        errors.forename = "Forename is required";
    }

    if (!regName.test(formData.surname)) {
        errors.surname = "Surname is not valid";
    }

    if (!formData.surname) {
        errors.surname = "Surname is required";
    }

    if (!regName.test(formData.nationality)) {
        errors.nationality = "Nationality is not valid";
    }

    if (!formData.nationality) {
        errors.nationality = "Nationality is required";
    }

    if (!formData.dob) {
        errors.dob = "Date of birth is required";
    }

    if (!formData.teams || formData.teams.length === 0) {
        errors.teams = "At least one team must be selected";
    }

    return errors;
};

export default validate;

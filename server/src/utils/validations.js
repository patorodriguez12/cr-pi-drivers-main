// name validation
function validateName(name) {
  if (!name.trim()) {
    return false;
  }
  const regex = /^[a-zA-ZÀ-ÿ0-9\s]{3,35}$/;

  return regex.test(name);
}

// image validation
function validateImageLink(image) {
  const regex = /^(https?|ftp):\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/i;
  return regex.test(image);
}

module.exports = {
  validateName,
  validateImageLink
}
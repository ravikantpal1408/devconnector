const Validator = require('validator');
const isEmpty = require('./empty');

module.exports = function validateEducationInput(data) {

  let errors = {}; // error object

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';

  if (!Validator.isLength(data.school, { min: 4, max: 50 })) {
    errors.school = 'School exceeds the character length';
  }

  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  if (!Validator.isLength(data.degree, { min: 4, max: 50 })) {
    errors.degree = 'Degree exceeds the character length';
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (!Validator.isLength(data.fieldofstudy, { min: 4, max: 50 })) {
    errors.fieldofstudy = 'Field exceeds the character length';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of Study is required';
  }

  if (!Validator.isEmpty(data.to)) {
    if (Validator.isAfter(data.from, data.to))
      errors.from = 'From date cannot exceed to date';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }


}
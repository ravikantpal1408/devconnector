const Validator = require('validator');
const isEmpty = require('./empty');

module.exports = function validateExperienceInput(data) {

  let errors = {}; // error object

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title is required';
  }
  if (!Validator.isLength(data.title, { min: 4, max: 50 })) {
    errors.title = 'Job title exceeds the character length';
  }

  if (!Validator.isLength(data.company, { min: 4, max: 50 })) {
    errors.company = 'Company exceeds the character length';
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
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
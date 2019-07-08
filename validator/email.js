const Validator = require('validator');
const isEmpty = require('./empty');

module.exports = function validateEmailInput(data) {

  let errors = {}; // error object

  data.email = !isEmpty(data.email) ? data.email : '';


  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (Validator.isLength(data.email, { min: 4, max: 50 })) {
    errors.email = 'Email exceeds the character length';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }


}
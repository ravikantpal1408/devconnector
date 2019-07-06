const Validator = require('validator');
const isEmpty = require('./empty');

module.exports = function validatePostInput(data) {

  let errors = {}; // error object

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 character';
  }

  if (Validator.isEmpty(data.text)) {
    errors.password = 'Text is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }


}
const Validator = require('validator');
const isEmpty = require('./empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    if (!Validator.isLength(data.email, { min: 3, max: 50 })) {
        errors.email = 'Email exceeds the character length';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    if (!Validator.isLength(data.password, { min: 6, max: 50 })) {
        errors.password = 'Password exceeds the character length';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is required';
    }

    if (!Validator.isLength(data.password, { min: 4, max: 18 })) {
        errors.password = 'Name must be between 4 and 18 characters';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password & confirm password do not match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
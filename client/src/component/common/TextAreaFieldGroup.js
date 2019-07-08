import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange

}) => {
    return (
        <div className="form-group">
            <textarea maxLength="500" className={classnames('form-control form-control-lg', { 'is-invalid': error })} placeholder={placeholder} name={name} onChange={onChange} value={value} />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className="invalid-feedback"> {error} </div>)}
        </div>
    )
}

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired

}

export default TextAreaFieldGroup;
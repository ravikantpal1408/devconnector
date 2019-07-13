import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { sendResetEmail } from '../../actions/authAction';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {

            }
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }



    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }


    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault();

        const verifyUser = {
            email: this.state.email,
        };

        this.props.sendResetEmail(verifyUser);

    }



    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="text-center">
                    <h1 className="text-muted diaplay-4">Enter Your Registered Email</h1>
                    <hr />
                    <p className="lead text-muted">Please enter your email address for security reason.</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="col-6 offset-3">
                            <div className="form-group">
                                <input
                                    type="email"
                                    maxLength="50"
                                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })}
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                                {errors.email && (<div className="invalid-feedback"> {errors.email} </div>)}

                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}





Password.propTypes = {
    sendResetEmail: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}



const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { sendResetEmail })(withRouter(Password));
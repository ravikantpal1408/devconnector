import React, { Component } from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const loginUser = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(loginUser, this.props.history);
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input maxLength="50" type="email" className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })} placeholder="Email Address" name="email" onChange={this.onChange} value={this.state.email} />
                                    {errors.email && (<div className="invalid-feedback"> {errors.email} </div>)}
                                </div>
                                <div className="form-group">
                                    <input maxLength="50" type="password" className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })} name="password" onChange={this.onChange} value={this.state.password} />
                                    {errors.password && (<div className="invalid-feedback"> {errors.password} </div>)}
                                </div>
                                <small className="form-text text-muted"><Link to="/forgot-password">Forgot password ?</Link></small>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProp = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProp, { loginUser })(Login);

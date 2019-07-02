import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';
import { clearCurrentProfile } from '../../actions/profileAction';

class Navbar extends Component {

    // logging out 
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        console.log('isAuthenticated ', this.props.auth)

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <span style={{ cursor: 'pointer' }} onClick={this.onLogoutClick.bind(this)} className="nav-link" >

                        <img className="rounded-circle" src={user.avatar} alt="user.name" title="gravatar" style={{ cursor: 'pointer', width: '25px', marginRight: '5px' }} />
                        {' '} Logout</span>

                </li>

            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign In</Link>
                </li>
            </ul>
        );

        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/" >Dev-Connector</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Developers</Link>

                                </li>
                            </ul>


                            {isAuthenticated ? authLinks : guestLinks}

                        </div>
                    </div>
                </nav>


            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
})

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);

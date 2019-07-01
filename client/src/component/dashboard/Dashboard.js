import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';


class Dashboard extends Component {

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        this.props.getCurrentProfile();
    }

    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;
        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            // check if logged user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = <h4>TODO: Display Profile</h4>
            } else {
                // user is logged in but has no profile 
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome {user.name}
                        </p>
                        <p>You have not set up the profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                )
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propType = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const matStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})


export default connect(matStateToProps, { getCurrentProfile })(Dashboard);
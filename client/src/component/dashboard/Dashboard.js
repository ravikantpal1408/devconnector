import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        )
    }
}



export default connect(null, { getCurrentProfile })(Dashboard);
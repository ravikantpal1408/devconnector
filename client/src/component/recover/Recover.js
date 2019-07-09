import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkAccount } from '../../actions/authAction';


class Recover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      authId: this.props.match.params.auth
    };
    console.log(this.props.match.params.auth)
    this.props.history.push('/not-found');


  }
  componentDidMount() {

    if (!this.props.match.params.auth) {
      this.props.history.push('/not-found');
    }

  }




  render() {
    return (
      <div>
        <h1>Recover My Email</h1>
      </div>
    )
  }
}

Recover.propTypes = {
  checkAccount: PropTypes.func.isRequired,
  // authId: PropTypes.object.isRequired
}



const mapStateToProps = state => ({
  // authId: state.authId
})

export default connect(mapStateToProps, { checkAccount })(Recover);
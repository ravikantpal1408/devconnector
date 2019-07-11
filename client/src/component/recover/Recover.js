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
  }


  componentDidMount() {

  }




  render() {
    let content;
    if (this.props.match.params.auth) {
      console.log('params :', this.props.match.params.auth)
      content = <h1>Hello</h1>
    } else {
      content = <h1>Not Found</h1>
    }
    return (
      <div>
        {content}
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
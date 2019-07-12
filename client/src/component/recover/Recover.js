import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { checkAccount } from '../../actions/authAction';


class Recover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      authId: this.props.match.params.auth,
      errors: {}
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

  componentDidMount() {
    if (!this.props.match.params.auth) {
      this.props.history.push('/not-found');
    }
  }



  onSubmit(event) {
    event.preventDefault();

    const verifyUser = {
      email: this.state.email,
      authId: this.props.match.params.auth
    };
    console.log('submit', verifyUser)
    // this.props.checkAccount(newUser, this.props.history);

  }

  render() {

    const { errors } = this.state;

    return (
      <div className="container">
        <div className="text-center">
          <h1 className="text-muted diaplay-4">Verify Your Identity</h1>
          <hr />
          <p className="lead text-muted">Please enter your email address for security reason.</p>
          <form onSubmit={this.onSubmit}>
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
          </form>
        </div>
      </div>
    )
  }
}

Recover.propTypes = {
  checkAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

}



const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { checkAccount })(withRouter(Recover));
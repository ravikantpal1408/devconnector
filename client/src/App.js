import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { Provider } from 'react-redux';
import store from '../src/store';
import Dashboard from './component/dashboard/Dashboard';
import PrivateRoute from './component/common/PrivateRoute';


import './App.css';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import { clearCurrentProfile } from './actions/profileAction';

// check for token 
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and is Authenticated 
  store.dispatch(setCurrentUser(decoded));

  // check for expiration time 
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user 
    store.dispatch(logoutUser());
    // TODO: clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login 
    window.location.href = '/login';

  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>

            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

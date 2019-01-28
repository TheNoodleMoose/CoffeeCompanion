import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticationService from './services/AuthenticationService';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Brewing from './Components/Brewing';

class App extends Component {
  state = {
    cool: '',
    CurrentUser: {
      name: 'Christian',
    },
    loggedIn: false,
  };

  async componentDidMount() {
    const response = await AuthenticationService.test();
    const body = await response.json();

    this.setState({
      cool: body.message,
    });
  }

  updateUser = () => {
    this.setState({
      loggedIn: true,
    });
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
    });
  };

  render() {
    const { CurrentUser } = this.state;
    return (
      <Router>
        <div className="App">
          <header className="App-header" />

          <Switch>
            <Route
              exact
              path="/"
              render={props => <Register {...props} updateUser={this.updateUser} />}
            />

            <Route
              path="/Login"
              render={props => <Login {...props} updateUser={this.updateUser} />}
            />
            <Route
              path="/Brewing"
              render={props => (
                <Brewing {...props} currentUser={CurrentUser} logOut={this.logOut} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

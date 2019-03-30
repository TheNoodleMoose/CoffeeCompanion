import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import HomeBrewing from './Components/HomeBrewing';
import Journal from './Components/Journal';

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <div className="App">
          <header data-testid="header" className="App-header" />

          <Switch>
            <Route exact path="/" render={props => <Register {...props} />} />
            <Route path="/Login" render={props => <Login {...props} />} />
            <Route
              path="/Brewing"
              render={props => <HomeBrewing {...props} />}
            />
            <Route path="/Journal" render={props => <Journal {...props} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

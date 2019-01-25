import React, { Component } from 'react';
import AuthenticationService from './services/AuthenticationService';
import './App.css';


class App extends Component {
  state = {
    cool: 'Hello',
  };

  async componentDidMount() {
    const response = await AuthenticationService.test();
    const body = await response.json();

    this.setState({
      cool: body.message,
    });
  }

  render() {
    const { cool } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {cool}
          </a>

        </header>
      </div>
    );
  }
}

export default App;

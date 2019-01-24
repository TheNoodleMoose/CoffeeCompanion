import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    cool: 'Hello',
  };

  render() {
    const { cool } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit
            {' '}
            <code>src/App.js</code>
            {' '}
and save to reload.
          </p>
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

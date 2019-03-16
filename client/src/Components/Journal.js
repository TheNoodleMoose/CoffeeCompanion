import React, { Component } from 'react';
import AuthHelperMethods from '../services/AuthenticationService';
import axios from 'axios';
import JournalCard from './SubComponents/JournalCard';

class Journal extends Component {
  state = {}

  Auth = new AuthHelperMethods;

  componentWillMount() {
    const userInfo = this.Auth.getConfirm();
    this.setState({
      email: userInfo.email,
      entries: [],
    });
  };

  async componentDidMount() {
    const { email } = this.state;
    const entries = await axios.get(`/journal/${email}`);
    this.setState({
      entries: entries.data,
    })
    console.log(this.state);
  };

  render() {
    const { entries } = this.state;
    console.log(entries);
    return (
      <div>
        <h1>Journal</h1>
        <div>
          {this.state.entries.map(entry =>
            <JournalCard entry={entry} key={entry.createdAt} />
          )
          }
        </div>
      </div>
    );
  }
}

export default Journal;

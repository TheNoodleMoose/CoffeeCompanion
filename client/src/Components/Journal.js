import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthHelperMethods from '../services/AuthenticationService';
import JournalCard from './SubComponents/JournalCard';

class Journal extends Component {
  state = {};

  Auth = new AuthHelperMethods();

  componentWillMount() {
    const userInfo = this.Auth.getConfirm();
    this.setState({
      email: userInfo.email,
      entries: [],
    });
  }

  async componentDidMount() {
    const { email } = this.state;
    const entries = await axios.get(`/journal/${email}`);
    this.setState({
      entries: entries.data,
    });
    console.log(this.state);
  }

  render() {
    const { entries } = this.state;
    console.log(entries);
    return (
      <div>
        <Link to="/brewing">
          <LoginButton>Brew Coffee</LoginButton>
        </Link>
        <h1>Journal</h1>
        <div>
          {entries.map(entry => (
            <JournalCard entry={entry} key={entry.createdAt} />
          ))}
        </div>
      </div>
    );
  }
}

export default Journal;

const LoginButton = styled.button`
  background: #67615a;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  margin: 20px 0;
  width: 150px;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
`;

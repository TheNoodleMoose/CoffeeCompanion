import React, { Component } from 'react';
import AuthHelperMethods from '../services/AuthenticationService';

/* A higher order component is frequently written as a function that returns a class. */
export default function withAuth(AuthComponent) {
  const Auth = new AuthHelperMethods();

  return class AuthWrapped extends Component {
    state = {
      confirm: null,
      loaded: false,
    };

    /* In the componentDidMount, we would want to do a couple of
    important tasks in order to verify the current users authentication status
    prior to granting them enterance into the app. */
    componentWillMount() {
      const { history } = this.props;
      if (!Auth.loggedIn()) {
        history.replace('/login');
      } else {
        /* Try to get confirmation message from the Auth helper. */
        try {
          const confirm = Auth.getConfirm();
          console.log('confirmation is:', confirm);
          this.setState({
            confirm,
            loaded: true,
          });
        } catch (err) {
          console.log(err);
          Auth.logout();
          history.replace('/login');
        }
      }
    }

    render() {
      const { history } = this.props;
      const { loaded, confirm } = this.state;
      if (loaded === true) {
        if (confirm) {
          console.log('confirmed!');
          return (
            /* component that is currently being wrapper(App.js) */
            <AuthComponent history={history} confirm={confirm} />
          );
        }

        console.log('not confirmed!');
        return null;
      }

      return null;
    }
  };
}

import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Login from '../Components/Login';

afterEach(cleanup);

// Create a fake onSubmit for testing
const onSubmit = jest.fn();

// Define a fake user for testing
const User = {
  email: 'cjh605@gmail.com',
  password: 'SuperSecretPassword123',
};

test('<Login>', () => {
  const { debug, getByTestId, getByLabelText } = render(
    <MemoryRouter>
      <Login submitFakeForm={onSubmit} />
    </MemoryRouter>,
  );
  //   We check to see if the login-form exist
  expect(getByTestId('login-form')).toBeTruthy();

  //   Fire an event to change the value of email to our users
  fireEvent.change(getByLabelText('Email'), {
    target: {
      value: User.email,
    },
  });
  //   Fire an event to change the value of password to our users
  fireEvent.change(getByLabelText('Password'), {
    target: {
      value: User.password,
    },
  });

  //   Fire an event on login button
  // fireEvent.click(getByTestId('login-button'));

  //   We should expect our fake function to run 1 time
  // expect(onSubmit).toHaveBeenCalledTimes(1);
  //   We should expect our fake function to have been submitted with
  // our fake info provided
  // expect(onSubmit).toHaveBeenCalledWith({
  //   email: User.email,
  //   password: User.password,
  // });
  //   Render it out with the logged in info
  debug();
});

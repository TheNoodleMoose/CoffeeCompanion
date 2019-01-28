import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Brewing from '../Components/Brewing';

afterEach(cleanup);

const currentUser = {
  name: 'Austin',
};

const userIntro = `Hi ${currentUser.name}!`;

test('<Brewing>', () => {
  const { debug, getByTestId } = render(
    <MemoryRouter>
      <Brewing currentUser={currentUser} />
    </MemoryRouter>,
  );
  expect(getByTestId('users-intro').textContent).toBe(userIntro);
  debug();
});

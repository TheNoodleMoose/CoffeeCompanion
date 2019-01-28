import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Brewing from '../Components/Brewing';

afterEach(cleanup);

// const confirm = {
//   name: 'Austin',
// };

// const userIntro = `Hi ${confirm.name}!`;

const auth = {
  loggedIn() {
    return true;
  },
  getUser() {
    return {
      name: 'Austin',
    };
  },
};

const historyMock = { replace: jest.fn() };

test('<Brewing>', () => {
  const { debug } = render(
    <MemoryRouter>
      <Brewing history={historyMock} auth={auth} />
    </MemoryRouter>,
  );
  // expect(getByTestId('users-intro').textContent).toBe(userIntro);
  expect(historyMock.replace.mock.calls[0]).toEqual(['/login']);
  debug();
});

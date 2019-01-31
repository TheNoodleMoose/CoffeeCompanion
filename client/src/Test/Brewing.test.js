import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

// import decode from 'jwt-decode';
import Brewing from '../Components/Brewing';

// import AuthHelperMethods from '../services/AuthenticationService';

// const Auth = new AuthHelperMethods();

afterEach(cleanup);
// describe('Auth.login', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });
//   it('invokes the success callback on success', (done) => {
//     const mockUser = { username: 'cjh605@gmail.com', password: 'password' };
//     // pretend that everything went great, and give back our mock user
//     jest.spyOn(Auth, 'login').mockReturnValue(true);

//     Auth.login('bob', 'tom');
//   });
// });
const historyMock = { replace: jest.fn() };

test('<Brewing>', () => {
  const { debug } = render(
    <MemoryRouter>
      <Brewing history={historyMock} />
    </MemoryRouter>,
  );
  // expect(getByTestId('users-intro').textContent).toBe(userIntro);
  expect(historyMock.replace.mock.calls[0]).toEqual(['/login']);
  debug();
});

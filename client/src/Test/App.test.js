import React from 'react';
import { render, cleanup } from 'react-testing-library';
import App from '../App';

afterEach(cleanup);

// Just render out the <App> component and make sure it displays how it should
test('<App>', () => {
  const { debug } = render(<App />);

  // debug();
});

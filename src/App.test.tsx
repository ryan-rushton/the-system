import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App', () => {
  afterEach(cleanup);

  test('it renders without crashing', () => {
    render(<App />);

    expect(screen.getByText(/^The System$/)).toBeInTheDocument();
  });
});

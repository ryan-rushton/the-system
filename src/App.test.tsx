import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from './App';

describe('App', () => {
  test('it renders without crashing', () => {
    render(<App />);

    expect(screen.getByText(/^The System$/)).toBeInTheDocument();
  });
});

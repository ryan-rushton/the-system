import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import CloseButton from './CloseButton';

describe('NavMenu', () => {
  afterEach(cleanup);

  test('it renders', () => {
    render(<CloseButton onClose={jest.fn()} />);

    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    render(<CloseButton onClose={jest.fn()} />);

    expect(screen.getByTestId('close-button')).toMatchSnapshot();
  });

  // Don't need an on Enter keydown test as the main element is a button
  test('it calls the onClose prop on click', async () => {
    const onClose = jest.fn();
    render(<CloseButton onClose={onClose} />);

    await userEvent.click(screen.getByTestId('close-button'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

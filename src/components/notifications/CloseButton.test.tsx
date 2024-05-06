import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { CloseButton } from './CloseButton';

describe('NavMenu', () => {
  test('it renders', () => {
    render(<CloseButton onClose={vi.fn()} />);

    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    render(<CloseButton onClose={vi.fn()} />);

    expect(screen.getByTestId('close-button')).toMatchSnapshot();
  });

  // Don't need an on Enter keydown test as the main element is a button
  test('it calls the onClose prop on click', async () => {
    const onClose = vi.fn();
    render(<CloseButton onClose={onClose} />);

    await userEvent.click(screen.getByTestId('close-button'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

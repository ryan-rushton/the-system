import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { NavMenuSubsection } from './NavMenuSubsection';

describe('NavMenuSubsection', () => {
  test('it renders', () => {
    render(
      <NavMenuSubsection title="Some menu" canTabInto={true} isVisible={true} onHeaderClick={vi.fn()}>
        <div>{"I'm a child!"}</div>
      </NavMenuSubsection>,
    );
    const title = screen.getByText('Some menu');

    expect(title).toBeInTheDocument();
  });

  test('it calls onHeaderClick when the header is clicked', async () => {
    const onHeaderClick = vi.fn();
    render(
      <NavMenuSubsection title="Some menu" canTabInto={true} isVisible={true} onHeaderClick={onHeaderClick}>
        <div>{"I'm a child!"}</div>
      </NavMenuSubsection>,
    );

    await userEvent.click(screen.getByText(/^Some menu$/));

    expect(onHeaderClick).toHaveBeenCalledTimes(1);
  });
});

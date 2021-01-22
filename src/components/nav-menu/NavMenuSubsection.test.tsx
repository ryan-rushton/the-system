import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NavMenuSubsection from './NavMenuSubsection';

describe('NavMenuSubsection', () => {
  test('it renders', () => {
    render(
      <NavMenuSubsection title="Some menu" isVisible={true} onHeaderClick={jest.fn()}>
        <div>{"I'm a child!"}</div>
      </NavMenuSubsection>
    );
    const title = screen.getByText('Some menu');

    expect(title).toBeInTheDocument();
  });

  test('it calls onHeaderClick when the header is clicked', () => {
    const onHeaderClick = jest.fn();
    render(
      <NavMenuSubsection title="Some menu" isVisible={true} onHeaderClick={onHeaderClick}>
        <div>{"I'm a child!"}</div>
      </NavMenuSubsection>
    );

    userEvent.click(screen.getByText(/^Some menu$/));

    expect(onHeaderClick).toBeCalledTimes(1);
  });

  test('it calls onHeaderClick when the header receives an enter keydown', () => {
    const onHeaderClick = jest.fn();
    render(
      <NavMenuSubsection title="Some menu" isVisible={true} onHeaderClick={onHeaderClick}>
        <div>{"I'm a child!"}</div>
      </NavMenuSubsection>
    );

    fireEvent.keyDown(screen.getByText(/Some menu/), { key: 'Enter', keyCode: 13 });

    expect(onHeaderClick).toBeCalledTimes(1);
  });
});

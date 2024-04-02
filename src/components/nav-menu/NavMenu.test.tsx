import { render, screen } from '@testing-library/react';
import React from 'react';
import NavMenu from './NavMenu';

describe('NavMenu', () => {
  test('it renders', () => {
    render(
      <NavMenu
        orbitsVisible={false}
        onChangeSystemSize={jest.fn()}
        onFollowPointOfInterest={jest.fn()}
        onOrbitsVisibleChange={jest.fn()}
      />,
    );

    expect(screen.getByTestId('nav-menu-button')).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    render(
      <NavMenu
        orbitsVisible={false}
        onChangeSystemSize={jest.fn()}
        onFollowPointOfInterest={jest.fn()}
        onOrbitsVisibleChange={jest.fn()}
      />,
    );

    expect(screen.getByTestId('nav-menu-container')).toMatchSnapshot();
  });
});

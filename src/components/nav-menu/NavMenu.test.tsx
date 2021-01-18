import React from 'react';
import { render, screen } from '@testing-library/react';

import NavMenu from './NavMenu';

describe('NavMenu', () => {
  test('it renders', () => {
    render(
      <NavMenu
        orbitsVisible={false}
        pointsOfInterestMap={{ somePoint: { display: 'Some point', ref: React.createRef() } }}
        onChangeSystemSize={jest.fn()}
        onFollowPointOfInterest={jest.fn()}
        onOrbitsVisibleChange={jest.fn()}
      />
    );

    expect(screen.getByTestId('nav-menu')).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    const { container } = render(
      <NavMenu
        orbitsVisible={false}
        pointsOfInterestMap={{ somePoint: { display: 'Some point', ref: React.createRef() } }}
        onChangeSystemSize={jest.fn()}
        onFollowPointOfInterest={jest.fn()}
        onOrbitsVisibleChange={jest.fn()}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

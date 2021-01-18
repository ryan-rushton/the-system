import { render, screen } from '@testing-library/react';
import React from 'react';

import { pointsOfInterest } from '../../PointsOfInterest';
import Planet from './Planet';

describe('Planet', () => {
  test('it matches the snapshot', () => {
    const { jupiter } = pointsOfInterest;
    const { container } = render(
      <Planet
        className={'some-styles'}
        distance={jupiter.distance}
        orbitalPeriod={jupiter.orbitalPeriod}
        radius={jupiter.radius}
        satellites={jupiter.satellites}
        scrollToRef={jupiter.ref}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('it renders the correct number of celestial bodies', () => {
    const { jupiter } = pointsOfInterest;
    render(
      <Planet
        className={'some-styles'}
        distance={jupiter.distance}
        orbitalPeriod={jupiter.orbitalPeriod}
        radius={jupiter.radius}
        satellites={jupiter.satellites}
        scrollToRef={jupiter.ref}
      />
    );
    expect(screen.getAllByTestId('celestial-body').length).toBe(1 + jupiter.satellites.length);
  });
});

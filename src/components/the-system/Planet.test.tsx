import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { pointsOfInterest } from '../../PointsOfInterest';
import Planet from './Planet';

describe('Planet', () => {
  afterEach(cleanup);

  test('it matches the snapshot', () => {
    const { jupiter } = pointsOfInterest;
    render(
      <Planet
        id={jupiter.id}
        className={'some-styles'}
        distance={jupiter.distance}
        orbitalPeriod={jupiter.orbitalPeriod}
        radius={jupiter.radius}
        satellites={jupiter.satellites}
        scrollToRef={jupiter.ref}
      />
    );

    expect(screen.getByTestId('jupiter-orbit-line')).toMatchSnapshot();
  });

  test('it renders the correct number of celestial bodies', () => {
    const { jupiter } = pointsOfInterest;
    render(
      <Planet
        id={jupiter.id}
        className={'some-styles'}
        distance={jupiter.distance}
        orbitalPeriod={jupiter.orbitalPeriod}
        radius={jupiter.radius}
        satellites={jupiter.satellites}
        scrollToRef={jupiter.ref}
      />
    );
    expect(screen.getByTestId('jupiter')).toBeInTheDocument();
    for (const satellite of jupiter.satellites) {
      expect(screen.getByTestId(satellite.id)).toBeInTheDocument();
    }
  });
});

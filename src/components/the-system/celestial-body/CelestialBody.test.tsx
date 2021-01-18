import { render, screen } from '@testing-library/react';
import React from 'react';

import { pointsOfInterest } from '../../../PointsOfInterest';
import CelestialBody from './CelestialBody';

describe('C', () => {
  test('it matches the snapshot', () => {
    const { jupiter } = pointsOfInterest;
    const { container } = render(
      <CelestialBody
        className={'some-styles'}
        distance={jupiter.distance}
        orbitalPeriod={jupiter.orbitalPeriod}
        radius={jupiter.radius}
        referenceRadius={1000}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('it renders the correct number of celestial bodies', () => {
    const { jupiter } = pointsOfInterest;
    render(
      <CelestialBody
        className={'some-styles'}
        distance={jupiter.distance}
        orbitalPeriod={jupiter.orbitalPeriod}
        radius={jupiter.radius}
        referenceRadius={1000}
        satellites={jupiter.satellites}
      />
    );
    expect(screen.getAllByTestId('celestial-body').length).toBe(1 + jupiter.satellites.length);
  });
});

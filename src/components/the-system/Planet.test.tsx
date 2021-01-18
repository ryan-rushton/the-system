import { render, screen } from '@testing-library/react';
import React from 'react';

import { pointsOfInterest } from '../../PointsOfInterest';
import Planet from './Planet';

describe('Planet', () => {
  test('it renders the correct number of celestial bodies', () => {
    const { jupiter } = pointsOfInterest;
    render(
      <Planet
        className={'some-styles'}
        scrollToRef={jupiter.ref}
        radius={jupiter.radius}
        distance={jupiter.distance}
        orbitalPeriod={jupiter.orbitalPeriod}
        satellites={jupiter.satellites}
      />
    );
    expect(screen.getAllByTestId('celestial-body').length).toBe(1 + jupiter.satellites.length);
  });
});

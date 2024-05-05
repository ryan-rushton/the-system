import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { pointsOfInterest } from '../../../PointsOfInterest';
import CelestialBody from './CelestialBody';

describe('CelestialBody', () => {
  test('it matches the snapshot', () => {
    const { jupiter } = pointsOfInterest;
    render(
      <CelestialBody
        id={jupiter.id}
        className={'some-styles'}
        distance={jupiter.distance}
        orbitalPeriod={jupiter.orbitalPeriod}
        radius={jupiter.radius}
        referenceRadius={1000}
      />,
    );

    expect(screen.getByTestId('jupiter-orbit-line')).toMatchSnapshot();
  });

  test('it renders the correct number of celestial bodies', () => {
    const { jupiter } = pointsOfInterest;
    render(
      <CelestialBody
        id={jupiter.id}
        className={'some-styles'}
        distance={jupiter.distance}
        orbitalPeriod={jupiter.orbitalPeriod}
        radius={jupiter.radius}
        referenceRadius={1000}
        satellites={jupiter.satellites.map((s) => ({ ...s, referenceRadius: jupiter.radius }))}
      />,
    );

    expect(screen.getByTestId('jupiter')).toBeInTheDocument();
    for (const satellite of jupiter.satellites) {
      expect(screen.getByTestId(satellite.id)).toBeInTheDocument();
    }
  });
});

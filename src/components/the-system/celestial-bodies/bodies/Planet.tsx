import React, { useContext, RefObject, FC } from 'react';

import AppContext from '../../../../SystemContext';
import CelestialBody, { CelestialBodyProps } from './CelestialBody';
import { pointsOfInterest } from '../../../../PointsOfInterest';
import styles from './Planet.module.scss';

interface Satellite {
  display: string;
  radius: number;
  distance: number;
  orbitalPeriod: number;
}

interface Props {
  className: string;
  planet: {
    ref: RefObject<HTMLDivElement>;
    display: string;
    radius: number;
    distance: number;
    orbitalPeriod: number;
    satellites?: readonly Satellite[];
  };
}

const Planet: FC<Props> = ({ className, planet }) => {
  const {
    multipliers: { distanceMultiplier, sizeMultiplier, orbitalPeriodMultiplier, satelliteDist },
  } = useContext(AppContext);
  const { distance, radius, orbitalPeriod, ref, satellites } = planet;

  const adjustedDistance = distance * distanceMultiplier + (pointsOfInterest.sun.radius - radius) * sizeMultiplier;
  const adjustRadius = radius * sizeMultiplier;
  const adjustedOrbitalPeriod = orbitalPeriod * orbitalPeriodMultiplier;

  const satelliteToCelestialBody = (satellite: Satellite): CelestialBodyProps => {
    // Make sure the moons are at lease 0.5px so they render.
    const satelliteRadius = Math.max(0.5, satellite.radius * sizeMultiplier);

    return {
      className: styles.satellite,
      radius: satelliteRadius,
      distance: satellite.distance * satelliteDist - adjustRadius - satelliteRadius,
      orbitalPeriod: satellite.orbitalPeriod * orbitalPeriodMultiplier,
      planetRadius: adjustRadius,
      hasOrbitLine: true,
    };
  };

  return (
    <CelestialBody
      className={className}
      distance={adjustedDistance}
      hasOrbitLine={true}
      orbitalPeriod={adjustedOrbitalPeriod}
      radius={adjustRadius}
      satellites={satellites?.map(satelliteToCelestialBody)}
      scrollToRef={ref}
    />
  );
};

export default Planet;

import React, { FC, RefObject, useContext } from 'react';
import AppContext from '../../context/SystemContext';
import { pointsOfInterest } from '../../PointsOfInterest';
import CelestialBody, { CelestialBodyProps } from './celestial-body/CelestialBody';
import styles from './Planet.module.scss';

/** Represents details used for the moon of a planet. */
interface Satellite {
  /** A value to use on data-testid for cypress tests. Likely the display from pointsOfInterest. */
  id: string;
  /** The radius in km */
  radius: number;
  /** The distance from what it is orbiting in km */
  distance: number;
  /** Its orbital period in days. */
  orbitalPeriod: number;
}

interface Props {
  /** A value to use on data-testid for cypress tests. Likely the display from pointsOfInterest. */
  id: string;
  /** Class name to give the element, passed to CelestialBody. */
  className: string;
  /** A ref so that we can scroll to planet when it is selected in the nav menu. */
  scrollToRef: RefObject<HTMLDivElement>;
  /** The radius of the planet in km's. */
  radius: number;
  /** The distance from the planet to the Sun. */
  distance: number;
  /** The number of days the planet takes to orbit the sun */
  orbitalPeriod: number;
  /** Things that orbit the planet, all moons at this stage. */
  satellites?: readonly Satellite[];
}

/**
 * A planet in the solar system. This applies multipliers to values before they get passed to CelestialBody.
 */
const Planet: FC<Props> = ({ id, className, distance, radius, orbitalPeriod, scrollToRef, satellites }) => {
  const {
    systemRadius,
    multipliers: { distanceMultiplier, sizeMultiplier, orbitalPeriodMultiplier, satelliteDist },
  } = useContext(AppContext);

  const adjustedDistance = distance * distanceMultiplier + (pointsOfInterest.sun.radius - radius) * sizeMultiplier;
  const adjustedRadius = radius * sizeMultiplier;
  const adjustedOrbitalPeriod = orbitalPeriod * orbitalPeriodMultiplier;

  const satelliteToCelestialBody = (satellite: Satellite): CelestialBodyProps => {
    // Make sure the moons are at least 1px so they can be seen.
    const satelliteRadius = Math.max(1, satellite.radius * sizeMultiplier);

    return {
      id: satellite.id,
      className: styles.satellite,
      distance: satellite.distance * satelliteDist + adjustedRadius - satelliteRadius,
      hasOrbitLine: true,
      orbitalPeriod: satellite.orbitalPeriod * orbitalPeriodMultiplier,
      radius: satelliteRadius,
      referenceRadius: adjustedRadius,
    };
  };

  return (
    <CelestialBody
      id={id}
      className={className}
      distance={adjustedDistance}
      hasOrbitLine={true}
      orbitalPeriod={adjustedOrbitalPeriod}
      radius={adjustedRadius}
      referenceRadius={systemRadius}
      satellites={satellites?.map(satelliteToCelestialBody)}
      scrollToRef={scrollToRef}
    />
  );
};

export default Planet;

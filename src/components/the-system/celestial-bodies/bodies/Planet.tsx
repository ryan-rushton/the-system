import React, { useContext, RefObject, FC } from 'react';

import AppContext, { SystemMultipliers } from '../../../../SystemContext';
import CelestialBody, { CelestialBodyProps } from './CelestialBody';
import { SunConsts } from '../../../../SharedConsts';
import { MoonDetails, PlanetDetails } from '../../../../types';

const moonToCB = (moon: MoonDetails, multipliers: SystemMultipliers, planetRadius: number): CelestialBodyProps => {
  const { className, radius, orbitalPeriod, distance } = moon;
  const { satelliteDist, orbitalPeriodMultiplier, sizeMultiplier } = multipliers;
  const moonRadius = Math.max(0.5, radius * sizeMultiplier);

  return {
    className,
    radius: moonRadius,
    distance: distance * satelliteDist - planetRadius * sizeMultiplier - moonRadius,
    orbitalPeriod: orbitalPeriod * orbitalPeriodMultiplier,
    planetRadius,
    hasOrbitLine: true,
  };
};

const applyMultipliers = (consts: PlanetDetails, multipliers: SystemMultipliers): PlanetDetails => ({
  distance:
    consts.distance * multipliers.distanceMultiplier + (SunConsts.radius - consts.radius) * multipliers.sizeMultiplier,
  radius: consts.radius * multipliers.sizeMultiplier,
  orbitalPeriod: consts.orbitalPeriod * multipliers.orbitalPeriodMultiplier,
});

interface Props {
  name: string;
  planetConstants: PlanetDetails;
  scrollToRef: RefObject<HTMLDivElement>;
  moons?: MoonDetails[];
}

const Planet: FC<Props> = ({ name, moons, planetConstants, scrollToRef }) => {
  const { multipliers } = useContext(AppContext);
  const { distance, radius, orbitalPeriod } = applyMultipliers(planetConstants, multipliers);
  const satellites = moons?.map((moon: MoonDetails) => moonToCB(moon, multipliers, radius));

  return (
    <CelestialBody
      className={name}
      distance={distance}
      hasOrbitLine
      orbitalPeriod={orbitalPeriod}
      radius={radius}
      satellites={satellites}
      scrollToRef={scrollToRef}
    />
  );
};

export default Planet;

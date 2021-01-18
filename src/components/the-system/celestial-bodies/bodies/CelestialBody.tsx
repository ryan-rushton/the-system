import clsx from 'clsx';
import React, { RefObject, CSSProperties, FC, useContext } from 'react';

import AppContext from '../../../../SystemContext';
import styles from './CelestialBody.module.scss';
import './CelestialBodyAnimations.scss';

export interface CelestialBodyProps {
  className: string;
  distance: number;
  orbitalPeriod: number;
  radius: number;
  hasOrbitLine?: boolean;
  planetRadius?: number;
  satellites?: CelestialBodyProps[];
  scrollToRef?: RefObject<HTMLDivElement>;
}

const CelestialBody: FC<CelestialBodyProps> = ({
  className,
  distance,
  orbitalPeriod,
  radius,
  hasOrbitLine,
  planetRadius,
  satellites,
  scrollToRef,
}) => {
  const context = useContext(AppContext);

  const getCssValuesForOrbits = (): CSSProperties => {
    const { systemRadius } = context;
    const referencePoint = planetRadius ? 0 : systemRadius;
    const referencePointRadius = planetRadius || 0;
    const center = referencePoint - distance - radius;
    const heightWidth = 2 * (distance + radius + referencePointRadius);

    return {
      animation: `orbit ${orbitalPeriod}s linear infinite`,
      height: heightWidth,
      left: center,
      top: center,
      width: heightWidth,
    };
  };

  const getCssValuesForBody = (): CSSProperties => {
    // Assume something with distance 0 (this sun) is already centred
    const top = distance > 0 ? '50%' : 0;
    const left = distance > 0 ? `${-radius - 1}px` : 0;

    return {
      animation: `planet-rotation ${orbitalPeriod}s linear infinite`,
      height: `${radius * 2}px`,
      left,
      top,
      width: `${radius * 2}px`,
    };
  };

  return (
    <div className={clsx(styles.orbit, { orbitLine: hasOrbitLine })} style={getCssValuesForOrbits()}>
      <div
        className={clsx(styles.celestialBody, className)}
        title={className}
        ref={scrollToRef}
        style={getCssValuesForBody()}
      >
        {satellites?.map((satellite) => (
          <CelestialBody key={`satellite-${satellite.className}`} {...satellite} />
        ))}
      </div>
    </div>
  );
};

export default CelestialBody;

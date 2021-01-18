import clsx from 'clsx';
import React, { RefObject, FC, useContext } from 'react';

import AppContext from '../../../../SystemContext';
import styles from './CelestialBody.module.scss';
import './CelestialBodyAnimations.scss';

export interface CelestialBodyProps {
  /** Class name for the celestial body */
  className: string;
  /** Distance from the sun with distance multiplier context applied */
  distance: number;
  /** Orbital period for the body orbital period multiplier context applied */
  orbitalPeriod: number;
  /** Radius for the body with size multiplier context applied */
  radius: number;
  /** Whether the red orbit line is visible. */
  hasOrbitLine?: boolean;
  /**
   * If this is a satellite, this planet radius will be populated.
   * It is so we can figure out how far the center of orbit is.
   * */
  planetRadius?: number;
  /** Any satellites that are orbiting this body. */
  satellites?: CelestialBodyProps[];
  /** A ref so that we can scroll to this body. */
  scrollToRef?: RefObject<HTMLDivElement>;
}

/**
 * This is the main component that places the elements on the page.
 *
 * It works by using one div for the orbit which is essentially a large disc.
 * On top of this we place the visual element for the body right at the edge.
 * The same edge also gets a border when the orbit lines are visible.
 * Satellite's are also CelestialBody's and are placed underneath the visual element of the body.
 * Basically this whole things is a bunch of spinning discs sitting on top of one another.
 */
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
  const { systemRadius } = useContext(AppContext);

  // orbit calcs and style
  const referencePoint = planetRadius ? 0 : systemRadius;
  const referencePointRadius = planetRadius || 0;
  const center = referencePoint - distance - radius;
  const heightWidth = 2 * (distance + radius + referencePointRadius);

  const orbitStyles = {
    animation: `orbit ${orbitalPeriod}s linear infinite`,
    height: heightWidth,
    left: center,
    top: center,
    width: heightWidth,
  };

  // body calcs and style
  // Assume something with distance 0 (this sun) is already centred
  const top = distance > 0 ? '50%' : 0;
  const left = distance > 0 ? `${-radius - 1}px` : 0;

  const bodyStyle = {
    animation: `planet-rotation ${orbitalPeriod}s linear infinite`,
    height: `${radius * 2}px`,
    left,
    top,
    width: `${radius * 2}px`,
  };

  return (
    <div className={clsx(styles.orbit, { orbitLine: hasOrbitLine })} style={orbitStyles}>
      <div className={clsx(styles.celestialBody, className)} title={className} ref={scrollToRef} style={bodyStyle}>
        {satellites?.map((satellite) => (
          <CelestialBody key={`satellite-${satellite.className}`} {...satellite} />
        ))}
      </div>
    </div>
  );
};

export default CelestialBody;

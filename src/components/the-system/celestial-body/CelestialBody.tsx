import clsx from 'clsx';
import React, { FC, RefObject } from 'react';
import styles from './CelestialBody.module.scss';
import './CelestialBodyAnimations.scss';

export interface CelestialBodyProps {
  /** A value to use on data-testid for cypress tests. Likely the display from pointsOfInterest. */
  id: string;
  /** Class name for the celestial body */
  className: string;
  /** Distance from the sun with distance multiplier context applied */
  distance: number;
  /** Orbital period for the body orbital period multiplier context applied */
  orbitalPeriod: number;
  /** Radius for the body with size multiplier context applied */
  radius: number;
  /**
   * This is the reference point the left and top calculations are referencing.
   *
   * This should either be the system radius for planets/sun or the radius of whatever the satellite is orbiting.
   * */
  referenceRadius: number;
  /** Whether the red orbit line is visible. */
  hasOrbitLine?: boolean;
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
  id,
  className,
  distance,
  orbitalPeriod,
  radius,
  hasOrbitLine,
  referenceRadius,
  satellites,
  scrollToRef,
}) => {
  // orbit calcs and style
  const edgeOffset = referenceRadius - distance - radius;
  const heightWidth = 2 * (distance + radius);

  const orbitStyles = {
    animation: `orbit ${orbitalPeriod}s linear infinite`,
    height: heightWidth,
    left: edgeOffset,
    top: edgeOffset,
    width: heightWidth,
  };

  // body calcs and style
  // Assume something with distance 0 (this sun) is already centred
  const top = distance > 0 ? '50%' : 0;
  // left needs to be negative so the center of the body sits on the orbit line.
  const left = distance > 0 ? -radius : 0;

  const bodyStyle = {
    animation: `planet-rotation ${orbitalPeriod}s linear infinite`,
    height: radius * 2,
    left,
    top,
    width: radius * 2,
  };

  return (
    <div
      data-testid={`${id}-orbit-line`}
      className={clsx(styles.orbit, { orbitLine: hasOrbitLine })}
      style={orbitStyles}
    >
      <div
        data-testid={id}
        className={clsx(styles.celestialBody, className)}
        title={className}
        ref={scrollToRef}
        style={bodyStyle}
      >
        {satellites?.map((satellite) => (
          <CelestialBody
            className={satellite.className}
            distance={satellite.distance}
            hasOrbitLine={hasOrbitLine}
            key={satellite.id}
            orbitalPeriod={satellite.orbitalPeriod}
            radius={satellite.radius}
            referenceRadius={satellite.referenceRadius}
            id={satellite.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CelestialBody;

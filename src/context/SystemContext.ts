import React from 'react';
import { pointsOfInterest } from '../PointsOfInterest';

/**
 * A set of multipliers so we can change how the system looks. At an even distance for everything objects move
 * very slow and distances between objects are quite large.
 * */
export interface SystemMultipliers {
  /** Multiplier for size of objects in the system. */
  sizeMultiplier: number;
  /** Multiplier for orbital periods in the system. */
  orbitalPeriodMultiplier: number;
  /**
   * Multiplier for distances between non satellite objects in the system, mainly distance between planets and the
   * sun.
   */
  distanceMultiplier: number;
  /** Multiplier for the distance between objects and their satellites. */
  satelliteDist: number;
}

/** Context for the system, this changes how distances are rendered. */
export interface SystemContext {
  /**
   * A set of multipliers so we can change how the system looks. At an even distance for everything objects move
   * very slow and distances between objects are quite large.
   * */
  multipliers: SystemMultipliers;
  /** The radius of the rendered system, this determines the page size. */
  systemRadius: number;
}

/**
 * A set of multipliers to give size and space even dimensions. Things move very slow here so we increase
 * the orbital speed.
 * */
const evenSpaceMultipliers: SystemMultipliers = {
  sizeMultiplier: 0.0005,
  orbitalPeriodMultiplier: 20,
  distanceMultiplier: 0.0005,
  satelliteDist: 0.0005,
};

/**
 * A set of multipliers to give a smaller view of the system but try and preserve the feeling that it is large.
 * You can easily see the inner planets near each other but further out distances are still quite large.
 */
const enhancedVisibilityMultipliers: SystemMultipliers = {
  sizeMultiplier: 0.0005,
  orbitalPeriodMultiplier: 1,
  distanceMultiplier: 0.00001,
  satelliteDist: 0.0001,
};

/**
 * Gets the radius for the system.
 *
 * We need to make sure that we make this large enough that pluto's div rotation doesn't create unaccounted for
 * whitespace on the edge of the screen (because its a big square). We do this by figuring out the hypotenuse
 * pluto would make with the a right angled triangle where the other two sides are the distance to the center of
 * the sun to the outer edge of pluto.
 */
const getSystemRadius = ({ distanceMultiplier, sizeMultiplier }: SystemMultipliers): number => {
  const { sun, pluto } = pointsOfInterest;
  const sunRadius = sizeMultiplier * sun.radius;
  const plutoDistance = sunRadius + distanceMultiplier * pluto.distance;
  const plutoOuterEdge = plutoDistance + 2 * sizeMultiplier * pluto.radius;

  return Math.sqrt(2 * plutoOuterEdge ** 2);
};

/**
 * Context for to give a smaller view of the system but try and preserve the feeling that it is large.
 * You can easily see the inner planets near each other but further out distances are still quite large.
 * */
const enhancedVisibility: SystemContext = {
  multipliers: enhancedVisibilityMultipliers,
  systemRadius: getSystemRadius(enhancedVisibilityMultipliers),
};

/**
 * A context to give size and space even dimensions. Things move very slow here so we increase
 * the orbital speed.
 */
const evenSpace: SystemContext = {
  multipliers: evenSpaceMultipliers,
  systemRadius: getSystemRadius(evenSpaceMultipliers),
};

/** The two context options for the system, they change the render distances/sizes. */
export const systemSize: { enhancedVisibility: SystemContext; evenSpace: SystemContext } = {
  enhancedVisibility,
  evenSpace,
};

const AppContext: React.Context<SystemContext> = React.createContext<SystemContext>(enhancedVisibility);

export default AppContext;

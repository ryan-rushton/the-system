import React, { RefObject, ReactElement, ReactNode, FC, useContext } from 'react';

import AppContext from '../../../SystemContext';
import { SunConsts } from '../../../SharedConsts';
import { MarsConsts } from '../TheSystem';
import { JupiterConsts } from '../celestial-bodies/jupiter/Jupiter';
import styles from './TheBelt.module.scss';
import BeltLayer from './BeltLayer';

interface Props {
  /** The ref to place in the belt so we can scroll to the edge of the belt. */
  scrollToRef: RefObject<HTMLDivElement>;
}

/**
 * We cache both sizes of the belt as the are relatively expensive to generate. Memo would
 * only cache one, this allows us to cache both sizes each with two layers.
 */
const beltCache = new Map<string, ReactElement>();

/**
 * The belt is a large collection of divs that represents the asteroid belt in the solar system. There
 * are two layers rotating at different speeds so it appears objects are moving at different speeds.
 *
 * When context is set to evenSpace, this still exists but the system is so large its hard to notice it!
 *
 * It would be much faster and a better user experience to generate an image which we use on the main
 * element but this project was initially an investigation into React performance when dealing with large
 * collections of elements. I wanted to keep some of that since it is now just a demo project. It lead to
 * the discovery of an issue in React Dev Tools, https://github.com/facebook/react/issues/16501.
 */
const TheBelt: FC<Props> = ({ scrollToRef }) => {
  const {
    multipliers: { distanceMultiplier, sizeMultiplier, orbitalPeriodMultiplier },
    systemRadius,
  } = useContext(AppContext);

  /**
   * Get the memoized belt layer. They are expensive to generate so this will create the belt layer the first
   * time and get the cached result every other time the relevant context is used again.
   *
   * @param baseOrbitalPeriod The orbital period for the layer of the belt
   * @param includedRef The ref so we can scroll to the edge of the belt
   */
  const memoizedLayer = (baseOrbitalPeriod: number, includedRef?: RefObject<HTMLDivElement>): ReactNode => {
    const refStatus = includedRef ? 'hasRef' : 'noRef';
    // The system radius should identify which context we are using.
    const key = `${systemRadius}-${baseOrbitalPeriod}-${refStatus}`;

    if (!beltCache.has(key)) {
      // The distance from the middle of the sun to the furthest point of Mats.
      const outerMars =
        MarsConsts.distance * distanceMultiplier +
        SunConsts.radius * sizeMultiplier +
        MarsConsts.radius * sizeMultiplier;

      // The distance from the middle of the sun to the closet point of Jupiter
      const innerJupiter =
        JupiterConsts.distance * distanceMultiplier +
        SunConsts.radius * sizeMultiplier -
        JupiterConsts.radius * sizeMultiplier;

      const distanceBetweenMarsAndJupiter = innerJupiter - outerMars;

      // I couldn't find any decent numbers on how far the belt is from Mars and Jupiter so I went with
      // some values that looked good with the enhanced visibility context.
      const innerBelt = outerMars + distanceBetweenMarsAndJupiter * 0.1;
      const outerBelt = outerMars + distanceBetweenMarsAndJupiter * 0.7;
      const distanceFromSystemOuterEdge = systemRadius - outerBelt;

      const orbitalPeriod = baseOrbitalPeriod * orbitalPeriodMultiplier;

      const style = {
        animation: `orbit ${orbitalPeriod}s linear infinite`,
        height: outerBelt * 2,
        left: distanceFromSystemOuterEdge,
        top: distanceFromSystemOuterEdge,
        width: outerBelt * 2,
      };

      const result = (
        <div className={styles.beltLayer} style={style}>
          <BeltLayer innerBoundary={innerBelt} outerBoundary={outerBelt} scrollToRef={includedRef} />
        </div>
      );

      beltCache.set(key, result);
    }

    return beltCache.get(key);
  };

  return (
    <div>
      {memoizedLayer(500, scrollToRef)}
      {memoizedLayer(600)}
    </div>
  );
};

export default TheBelt;

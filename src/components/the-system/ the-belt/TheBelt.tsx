import React, { RefObject, ReactElement, CSSProperties, ReactNode, FC, useContext } from 'react';

import AppContext from '../../../SystemContext';
import { SunConsts } from '../../../SharedConsts';
import { MarsConsts } from '../TheSystem';
import { JupiterConsts } from '../celestial-bodies/jupiter/Jupiter';
import styles from './TheBelt.module.scss';
import BeltLayer from './BeltLayer';

interface Props {
  scrollToRef: RefObject<HTMLDivElement>;
}

const beltCache = new Map<string, ReactElement>();

const TheBelt: FC<Props> = ({ scrollToRef }) => {
  const {
    multipliers: { distanceMultiplier, sizeMultiplier, orbitalPeriodMultiplier },
    systemRadius,
  } = useContext(AppContext);

  const outerMars =
    MarsConsts.distance * distanceMultiplier + SunConsts.radius * sizeMultiplier + MarsConsts.radius * sizeMultiplier;

  const innerJupiter =
    JupiterConsts.distance * distanceMultiplier +
    SunConsts.radius * sizeMultiplier -
    JupiterConsts.radius * sizeMultiplier;

  const innerBelt = outerMars + (innerJupiter - outerMars) * 0.1;
  const outerBelt = outerMars + (innerJupiter - outerMars) * 0.7;
  const beltSize = outerBelt - innerBelt;

  const getBeltStyle = (isFirstLayer: boolean): CSSProperties => {
    const baseOrbitalPeriod = isFirstLayer
      ? MarsConsts.orbitalPeriod
      : Math.floor(MarsConsts.orbitalPeriod / 100) * 100;

    const orbitalPeriod = baseOrbitalPeriod * orbitalPeriodMultiplier;

    return {
      animation: `orbit ${orbitalPeriod}s linear infinite`,
      height: outerBelt * 2,
      left: `calc(${systemRadius}px - ${outerBelt}px)`,
      top: `calc(${systemRadius}px - ${outerBelt}px)`,
      width: outerBelt * 2,
    };
  };

  const memoizedLayer = (includedRef?: RefObject<HTMLDivElement>): ReactNode => {
    const refStatus = includedRef ? 'hasRef' : 'noRef';
    const key = `${innerBelt}-${outerBelt}-${beltSize}-${refStatus}`;

    if (!beltCache.has(key)) {
      const result = (
        <BeltLayer innerBoundary={innerBelt} outerBoundary={outerBelt} size={beltSize} scrollToRef={includedRef} />
      );
      beltCache.set(key, result);
    }

    return beltCache.get(key);
  };

  return (
    <div>
      <div className={styles.beltLayer} style={getBeltStyle(true)}>
        {memoizedLayer(scrollToRef)}
      </div>
      <div className={styles.beltLayer} style={getBeltStyle(false)}>
        {memoizedLayer()}
      </div>
    </div>
  );
};

export default TheBelt;

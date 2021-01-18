import React, { useContext, FC } from 'react';

import AppContext from '../../../../SystemContext';
import { SunConsts } from '../../../../SharedConsts';
import CelestialBody from '../bodies/CelestialBody';
import styles from './Sun.module.scss';
import { pointsOfInterest } from '../../../../PointsOfInterest';

const Sun: FC = () => {
  const context = useContext(AppContext);

  return (
    <CelestialBody
      className={styles.sun}
      distance={0}
      radius={context.multipliers.sizeMultiplier * SunConsts.radius}
      orbitalPeriod={0}
      scrollToRef={pointsOfInterest.sun.ref}
    />
  );
};

export default Sun;

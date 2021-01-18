import React, { FC } from 'react';

import { pointsOfInterest } from '../../../../PointsOfInterest';
import Planet from '../bodies/Planet';
import styles from './Saturn.module.scss';

// This is radius including the rings
export const SaturnConsts = {
  radius: 80000 + 58232,
  distance: 1433500000,
  orbitalPeriod: 10747,
};

const titan = {
  className: styles.titan,
  distance: 1221870,
  orbitalPeriod: 15.95,
  radius: 2574,
};

const rhea = {
  className: styles.rhea,
  distance: 527108,
  orbitalPeriod: 1.77,
  radius: 764,
};

const Saturn: FC = () => (
  <Planet
    name={styles.saturn}
    moons={[rhea, titan]}
    planetConstants={SaturnConsts}
    scrollToRef={pointsOfInterest.saturn.ref}
  />
);

export default Saturn;

import React, { FC } from 'react';

import { pointsOfInterest } from '../../../../PointsOfInterest';
import Planet from '../bodies/Planet';
import styles from './Jupiter.module.scss';

export const JupiterConsts = {
  radius: 71498,
  distance: 778600000,
  orbitalPeriod: 4331,
};

const io = {
  className: styles.io,
  distance: 421700,
  orbitalPeriod: 1.77,
  radius: 1822,
};

const europa = {
  className: styles.europa,
  distance: 670900,
  orbitalPeriod: 3.55,
  radius: 1561,
};

const ganymede = {
  className: styles.ganymede,
  distance: 1070400,
  orbitalPeriod: 7.15,
  radius: 2634,
};

const callisto = {
  className: styles.callisto,
  distance: 1882700,
  orbitalPeriod: 16.69,
  radius: 2410,
};

const Jupiter: FC = () => (
  <Planet
    name={styles.jupiter}
    planetConstants={JupiterConsts}
    moons={[io, europa, ganymede, callisto]}
    scrollToRef={pointsOfInterest.jupiter.ref}
  />
);

export default Jupiter;

import React, { FC } from 'react';

import { pointsOfInterest } from '../../../../PointsOfInterest';
import Planet from '../bodies/Planet';
import styles from './Earth.module.scss';

const earthConsts = {
  radius: 6378,
  distance: 149600000,
  orbitalPeriod: 365.2,
};

const moon = {
  className: styles.moon,
  distance: 384400,
  orbitalPeriod: 27.3,
  radius: 1737,
};

const Earth: FC = () => (
  <Planet name={styles.earth} planetConstants={earthConsts} moons={[moon]} scrollToRef={pointsOfInterest.earth.ref} />
);

export default Earth;

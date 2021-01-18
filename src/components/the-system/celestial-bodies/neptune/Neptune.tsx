import React, { FC } from 'react';

import { pointsOfInterest } from '../../../../PointsOfInterest';
import Planet from '../bodies/Planet';
import styles from './Neptune.module.scss';

const NeptuneConsts = {
  radius: 24764,
  distance: 4495100000,
  orbitalPeriod: 59800,
};

const Neptune: FC = () => (
  <Planet name={styles.neptune} planetConstants={NeptuneConsts} scrollToRef={pointsOfInterest.neptune.ref} />
);

export default Neptune;

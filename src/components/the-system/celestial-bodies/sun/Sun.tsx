import React, { useContext, RefObject, ReactElement } from 'react';

import AppContext from '../../../../SystemContext';
import { SunConsts } from '../../../../SharedConsts';
import CelestialBody from '../bodies/CelestialBody';
import styles from './Sun.module.scss';

interface Props {
  scrollToRef: RefObject<HTMLDivElement>;
}

const Sun = ({ scrollToRef }: Props): ReactElement => {
  const context = useContext(AppContext);

  return (
    <CelestialBody
      className={styles.sun}
      distance={0}
      radius={context.multipliers.sizeMultiplier * SunConsts.radius}
      orbitalPeriod={0}
      scrollToRef={scrollToRef}
    />
  );
};

export default Sun;

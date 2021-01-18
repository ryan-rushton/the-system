import React, { useContext, FC } from 'react';

import AppContext from '../../SystemContext';
import TheBelt from './ the-belt/TheBelt';
import Planet from './celestial-bodies/bodies/Planet';
import styles from './TheSystem.module.scss';
import { PointsOfInterestMap } from '../../PointsOfInterest';
import CelestialBody from './celestial-bodies/bodies/CelestialBody';

interface Props {
  pointsOfInterest: PointsOfInterestMap;
}

const TheSystem: FC<Props> = ({ pointsOfInterest }) => {
  const { sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto } = pointsOfInterest;
  const { systemRadius, multipliers } = useContext(AppContext);

  const systemStyle = {
    height: 2 * systemRadius,
    width: 2 * systemRadius,
  };

  return (
    <div className={styles.theSystem} style={systemStyle}>
      <div className={styles.sunsGlow} style={systemStyle}>
        <Planet className={styles.pluto} planet={pluto} />
        <Planet className={styles.neptune} planet={neptune} />
        <Planet className={styles.uranus} planet={uranus} />
        <Planet className={styles.saturn} planet={saturn} />
        <Planet className={styles.jupiter} planet={jupiter} />
        <TheBelt />
        <Planet className={styles.mars} planet={mars} />
        <Planet className={styles.earth} planet={earth} />
        <Planet className={styles.venus} planet={venus} />
        <Planet className={styles.mercury} planet={mercury} />
        <CelestialBody
          className={styles.sun}
          distance={0}
          radius={multipliers.sizeMultiplier * sun.radius}
          orbitalPeriod={0}
          scrollToRef={pointsOfInterest.sun.ref}
        />
      </div>
    </div>
  );
};

export default React.memo(TheSystem);

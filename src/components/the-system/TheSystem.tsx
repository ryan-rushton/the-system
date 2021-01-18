import React, { useContext, FC } from 'react';

import AppContext from '../../context/SystemContext';
import TheBelt from './ the-belt/TheBelt';
import Planet from './Planet';
import styles from './TheSystem.module.scss';
import { pointsOfInterest } from '../../PointsOfInterest';
import CelestialBody from './celestial-body/CelestialBody';

/**
 * The Solar System! It is memoized so this only rerenders when the context is changed.
 */
const TheSystem: FC = () => {
  const { sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto } = pointsOfInterest;
  const { systemRadius, multipliers } = useContext(AppContext);

  const systemStyle = {
    height: 2 * systemRadius,
    width: 2 * systemRadius,
  };

  return (
    <div className={styles.theSystem} style={systemStyle}>
      <div className={styles.sunsGlow} style={systemStyle}>
        <Planet
          className={styles.pluto}
          distance={pluto.distance}
          orbitalPeriod={pluto.orbitalPeriod}
          radius={pluto.radius}
          scrollToRef={pluto.ref}
        />
        <Planet
          className={styles.neptune}
          distance={neptune.distance}
          orbitalPeriod={neptune.orbitalPeriod}
          radius={neptune.radius}
          scrollToRef={neptune.ref}
        />
        <Planet
          className={styles.uranus}
          distance={uranus.distance}
          orbitalPeriod={uranus.orbitalPeriod}
          radius={uranus.radius}
          scrollToRef={uranus.ref}
        />
        <Planet
          className={styles.saturn}
          distance={saturn.distance}
          orbitalPeriod={saturn.orbitalPeriod}
          radius={saturn.radius}
          satellites={saturn.satellites}
          scrollToRef={saturn.ref}
        />
        <Planet
          className={styles.jupiter}
          distance={jupiter.distance}
          orbitalPeriod={jupiter.orbitalPeriod}
          radius={jupiter.radius}
          satellites={jupiter.satellites}
          scrollToRef={jupiter.ref}
        />
        <TheBelt />
        <Planet
          className={styles.mars}
          distance={mars.distance}
          orbitalPeriod={mars.orbitalPeriod}
          radius={mars.radius}
          scrollToRef={mars.ref}
        />
        <Planet
          className={styles.earth}
          distance={earth.distance}
          orbitalPeriod={earth.orbitalPeriod}
          radius={earth.radius}
          satellites={earth.satellites}
          scrollToRef={earth.ref}
        />
        <Planet
          className={styles.venus}
          distance={venus.distance}
          orbitalPeriod={venus.orbitalPeriod}
          radius={venus.radius}
          scrollToRef={venus.ref}
        />
        <Planet
          className={styles.mercury}
          distance={mercury.distance}
          orbitalPeriod={mercury.orbitalPeriod}
          radius={mercury.radius}
          scrollToRef={mercury.ref}
        />
        <CelestialBody
          className={styles.sun}
          distance={0}
          orbitalPeriod={0}
          radius={multipliers.sizeMultiplier * sun.radius}
          referenceRadius={systemRadius}
          scrollToRef={pointsOfInterest.sun.ref}
        />
      </div>
    </div>
  );
};

export default React.memo(TheSystem);

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
          scrollToRef={pluto.ref}
          radius={pluto.radius}
          distance={pluto.distance}
          orbitalPeriod={pluto.orbitalPeriod}
        />
        <Planet
          className={styles.neptune}
          scrollToRef={neptune.ref}
          radius={neptune.radius}
          distance={neptune.distance}
          orbitalPeriod={neptune.orbitalPeriod}
        />
        <Planet
          className={styles.uranus}
          scrollToRef={uranus.ref}
          radius={uranus.radius}
          distance={uranus.distance}
          orbitalPeriod={uranus.orbitalPeriod}
        />
        <Planet
          className={styles.saturn}
          scrollToRef={saturn.ref}
          radius={saturn.radius}
          distance={saturn.distance}
          orbitalPeriod={saturn.orbitalPeriod}
          satellites={saturn.satellites}
        />
        <Planet
          className={styles.jupiter}
          scrollToRef={jupiter.ref}
          radius={jupiter.radius}
          distance={jupiter.distance}
          orbitalPeriod={jupiter.orbitalPeriod}
          satellites={jupiter.satellites}
        />
        <TheBelt />
        <Planet
          className={styles.mars}
          scrollToRef={mars.ref}
          radius={mars.radius}
          distance={mars.distance}
          orbitalPeriod={mars.orbitalPeriod}
        />
        <Planet
          className={styles.earth}
          scrollToRef={earth.ref}
          radius={earth.radius}
          distance={earth.distance}
          orbitalPeriod={earth.orbitalPeriod}
          satellites={earth.satellites}
        />
        <Planet
          className={styles.venus}
          scrollToRef={venus.ref}
          radius={venus.radius}
          distance={venus.distance}
          orbitalPeriod={venus.orbitalPeriod}
        />
        <Planet
          className={styles.mercury}
          scrollToRef={mercury.ref}
          radius={mercury.radius}
          distance={mercury.distance}
          orbitalPeriod={mercury.orbitalPeriod}
        />
        <CelestialBody
          className={styles.sun}
          distance={0}
          radius={multipliers.sizeMultiplier * sun.radius}
          orbitalPeriod={0}
          scrollToRef={pointsOfInterest.sun.ref}
          referenceRadius={systemRadius}
        />
      </div>
    </div>
  );
};

export default React.memo(TheSystem);

import React, { FC, useContext } from 'react';
import AppContext from '../../context/SystemContext';
import { pointsOfInterest } from '../../PointsOfInterest';
import TheBelt from './ the-belt/TheBelt';
import CelestialBody from './celestial-body/CelestialBody';
import Planet from './Planet';
import styles from './TheSystem.module.scss';

/**
 * The Solar System! It is memoized so this only re-renders when the context is changed.
 */
const TheSystem: FC = () => {
  const { sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto } = pointsOfInterest;
  const { systemRadius, multipliers } = useContext(AppContext);

  const systemStyle = {
    height: 2 * systemRadius,
    width: 2 * systemRadius,
  };

  return (
    <div data-testid="the-system" className={styles.theSystem} style={systemStyle}>
      <div className={styles.sunsGlow} style={systemStyle}>
        <Planet
          id={pluto.id}
          className={styles.pluto}
          distance={pluto.distance}
          orbitalPeriod={pluto.orbitalPeriod}
          radius={pluto.radius}
          scrollToRef={pluto.ref}
        />
        <Planet
          id={neptune.id}
          className={styles.neptune}
          distance={neptune.distance}
          orbitalPeriod={neptune.orbitalPeriod}
          radius={neptune.radius}
          scrollToRef={neptune.ref}
        />
        <Planet
          id={uranus.id}
          className={styles.uranus}
          distance={uranus.distance}
          orbitalPeriod={uranus.orbitalPeriod}
          radius={uranus.radius}
          scrollToRef={uranus.ref}
        />
        <Planet
          id={saturn.id}
          className={styles.saturn}
          distance={saturn.distance}
          orbitalPeriod={saturn.orbitalPeriod}
          radius={saturn.radius}
          satellites={saturn.satellites}
          scrollToRef={saturn.ref}
        />
        <Planet
          id={jupiter.id}
          className={styles.jupiter}
          distance={jupiter.distance}
          orbitalPeriod={jupiter.orbitalPeriod}
          radius={jupiter.radius}
          satellites={jupiter.satellites}
          scrollToRef={jupiter.ref}
        />
        <TheBelt />
        <Planet
          id={mars.id}
          className={styles.mars}
          distance={mars.distance}
          orbitalPeriod={mars.orbitalPeriod}
          radius={mars.radius}
          scrollToRef={mars.ref}
        />
        <Planet
          id={earth.id}
          className={styles.earth}
          distance={earth.distance}
          orbitalPeriod={earth.orbitalPeriod}
          radius={earth.radius}
          satellites={earth.satellites}
          scrollToRef={earth.ref}
        />
        <Planet
          id={venus.id}
          className={styles.venus}
          distance={venus.distance}
          orbitalPeriod={venus.orbitalPeriod}
          radius={venus.radius}
          scrollToRef={venus.ref}
        />
        <Planet
          id={mercury.id}
          className={styles.mercury}
          distance={mercury.distance}
          orbitalPeriod={mercury.orbitalPeriod}
          radius={mercury.radius}
          scrollToRef={mercury.ref}
        />
        <CelestialBody
          id={sun.id}
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

import React, { useContext, FC } from 'react';

import AppContext from '../../SystemContext';
import Sun from './celestial-bodies/sun/Sun';
import TheBelt from './ the-belt/TheBelt';
import Earth from './celestial-bodies/earth/Earth';
import Jupiter from './celestial-bodies/jupiter/Jupiter';
import Saturn from './celestial-bodies/saturn/Saturn';
import Neptune from './celestial-bodies/neptune/Neptune';
import Planet from './celestial-bodies/bodies/Planet';
import { PlutoConsts } from '../../SharedConsts';
import styles from './TheSystem.module.scss';
import { PointsOfInterestMap } from '../../PointsOfInterest';

const MercuryConsts = {
  radius: 2440,
  distance: 57900000,
  orbitalPeriod: 88,
};

const VenusConsts = {
  radius: 6052,
  distance: 108200000,
  orbitalPeriod: 224.7,
};

export const MarsConsts = {
  radius: 3396,
  distance: 227900000,
  orbitalPeriod: 687,
};

const UranusConsts = {
  radius: 25559,
  distance: 2872500000,
  orbitalPeriod: 30589,
};

interface Props {
  pointsOfInterest: PointsOfInterestMap;
}

const TheSystem: FC<Props> = ({ pointsOfInterest }) => {
  const { mercury, venus, mars, uranus, pluto } = pointsOfInterest;
  const { systemRadius } = useContext(AppContext);

  const systemStyle = {
    height: 2 * systemRadius,
    width: 2 * systemRadius,
  };

  return (
    <div className={styles.theSystem} style={systemStyle}>
      <div className={styles.sunsGlow} style={systemStyle}>
        <Planet name={styles.pluto} planetConstants={PlutoConsts} scrollToRef={pluto.ref} />
        <Neptune />
        <Planet name={styles.uranus} planetConstants={UranusConsts} scrollToRef={uranus.ref} />
        <Jupiter />
        <Saturn />
        <TheBelt />
        <Planet name={styles.mars} planetConstants={MarsConsts} scrollToRef={mars.ref} />
        <Earth />
        <Planet name={styles.venus} planetConstants={VenusConsts} scrollToRef={venus.ref} />
        <Planet name={styles.mercury} planetConstants={MercuryConsts} scrollToRef={mercury.ref} />
        <Sun />
      </div>
    </div>
  );
};

export default React.memo(TheSystem);

import React, { useContext, FC } from 'react';
import clsx from 'clsx';

import AppContext, { systemSize, SystemContext } from '../../../context/SystemContext';
import styles from './InfoMenu.module.scss';
import useClickAndEnterKeyDown from '../../../hooks/useClickAndEnterKeydown';

interface Props {
  /** Whether the component is currently visible. */
  isVisible: boolean;
  /** Whether the red orbit lines are visible */
  orbitsVisible: boolean;
  /** Change handler for showing the red orbit lines. */
  onOrbitsVisibleChange(newOrbitsVisible: boolean): void;
  /** Change handler for normalising km per pixel. */
  onChangeSystemSize(newContext: SystemContext): void;
}

/**
 * An info menu for the system. This shows a bunch of stats like km per pixel for different distances
 * (not all distances are equal by default). It also has buttons to show the red orbit lines and to
 * normalise the distances per pixel.
 */
const InfoMenu: FC<Props> = ({ isVisible, orbitsVisible, onChangeSystemSize, onOrbitsVisibleChange }) => {
  const context = useContext(AppContext);
  const { orbitalPeriodMultiplier, distanceMultiplier, sizeMultiplier, satelliteDist } = context.multipliers;

  const daysPerSecond = 1 * orbitalPeriodMultiplier;
  const kmPerPixelDistance = Math.round(1 / distanceMultiplier).toLocaleString();
  const kmPerPixelSatellite = Math.round(1 / satelliteDist).toLocaleString();
  const kmPerPixelSize = Math.round(1 / sizeMultiplier).toLocaleString();

  const [onOrbitChangeClick, onOrbitChangeEnter] = useClickAndEnterKeyDown((): void =>
    onOrbitsVisibleChange(!orbitsVisible)
  );

  const [onSizeChangeClick, onSizeChangeEnter] = useClickAndEnterKeyDown(() => {
    const { enhancedVisibility, evenSpace } = systemSize;
    const systemSizeContext = evenSpace === context ? enhancedVisibility : evenSpace;
    onChangeSystemSize(systemSizeContext);
  });

  return (
    <div data-testid="info-menu">
      <div className={styles.heading}>Time</div>
      <div data-testid="time" className={styles.stat}>{`${daysPerSecond} s = 1 day`}</div>
      <div className={styles.heading}>Distance Between Planets</div>
      <div data-testid="planet-distance" className={styles.stat}>{`1 pixel = ${kmPerPixelDistance} km`}</div>
      <div className={styles.heading}>Distance Between Planets And Moons</div>
      <div data-testid="satellite-distance" className={styles.stat}>{`1 pixel = ${kmPerPixelSatellite} km`}</div>
      <div className={styles.heading}>Planet Size</div>
      <div data-testid="planet-size" className={styles.stat}>{`1 pixel = ${kmPerPixelSize} km`}</div>
      <div className={styles.buttonWrapper}>
        <div
          className={clsx(styles.button, { [styles.buttonActive]: systemSize.evenSpace === context })}
          onClick={onSizeChangeClick}
          onKeyDown={onSizeChangeEnter}
          role="button"
          tabIndex={isVisible ? 0 : undefined}
          aria-label="Normalise Distance"
        >
          {'Normalise Distance'}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div
          className={clsx(styles.button, { [styles.buttonActive]: orbitsVisible })}
          onClick={onOrbitChangeClick}
          onKeyDown={onOrbitChangeEnter}
          role="button"
          tabIndex={isVisible ? 0 : undefined}
          aria-label="Show Orbits"
        >
          {'Show Orbits'}
        </div>
      </div>
    </div>
  );
};

export default InfoMenu;

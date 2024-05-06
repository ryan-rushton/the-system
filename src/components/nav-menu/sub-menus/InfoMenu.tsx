import clsx from 'clsx';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext, SystemContext, systemSize } from '../../../context/SystemContext';
import styles from './InfoMenu.module.scss';

/**
 * An info menu for the system. This shows a bunch of stats like km per pixel for different distances
 * (not all distances are equal by default). It also has buttons to show the red orbit lines and to
 * normalise the distances per pixel.
 */
export function InfoMenu({
  isVisible,
  orbitsVisible,
  onChangeSystemSize,
  onOrbitsVisibleChange,
}: {
  /** Whether the component is currently visible. */
  isVisible: boolean;
  /** Whether the red orbit lines are visible */
  orbitsVisible: boolean;
  /** Change handler for showing the red orbit lines. */
  onOrbitsVisibleChange(newOrbitsVisible: boolean): void;
  /** Change handler for normalising km per pixel. */
  onChangeSystemSize(newContext: SystemContext): void;
}) {
  const context = useContext(AppContext);
  const { t } = useTranslation();
  const { orbitalPeriodMultiplier, distanceMultiplier, sizeMultiplier, satelliteDist } = context.multipliers;

  const secondsInOneDay = 1 * orbitalPeriodMultiplier;
  const kmPerPixelDistance = Math.round(1 / distanceMultiplier).toLocaleString();
  const kmPerPixelSatellite = Math.round(1 / satelliteDist).toLocaleString();
  const kmPerPixelSize = Math.round(1 / sizeMultiplier).toLocaleString();

  const onOrbitChangeClick = useCallback(
    () => onOrbitsVisibleChange(!orbitsVisible),
    [onOrbitsVisibleChange, orbitsVisible],
  );

  const onSizeChangeClick = useCallback(() => {
    const { enhancedVisibility, evenSpace } = systemSize;
    const systemSizeContext = evenSpace === context ? enhancedVisibility : evenSpace;
    onChangeSystemSize(systemSizeContext);
  }, [context, onChangeSystemSize]);

  return (
    <div data-testid="info-menu">
      <div className={styles.heading}>{t('infoMenu.time')}</div>
      <div data-testid="time" className={styles.stat}>
        {t('infoMenu.secondsForOneDay', { seconds: secondsInOneDay })}
      </div>
      <div className={styles.heading}>{t('infoMenu.distanceBetweenPlanets')}</div>
      <div data-testid="planet-distance" className={styles.stat}>
        {t('infoMenu.kmPerPixel', { km: kmPerPixelDistance })}
      </div>
      <div className={styles.heading}>{t('infoMenu.distanceBetweenPlanetsAndMoons')}</div>
      <div data-testid="satellite-distance" className={styles.stat}>
        {t('infoMenu.kmPerPixel', { km: kmPerPixelSatellite })}
      </div>
      <div className={styles.heading}>{t('infoMenu.planetSize')}</div>
      <div data-testid="planet-size" className={styles.stat}>
        {t('infoMenu.kmPerPixel', { km: kmPerPixelSize })}
      </div>
      <div className={styles.buttonWrapper}>
        <button
          className={clsx(styles.button, { [styles.buttonActive]: systemSize.evenSpace === context })}
          onClick={onSizeChangeClick}
          tabIndex={isVisible ? 0 : undefined}
          aria-label={t('infoMenu.normaliseDistance') || undefined}
        >
          {t('infoMenu.normaliseDistance')}
        </button>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          className={clsx(styles.button, { [styles.buttonActive]: orbitsVisible })}
          onClick={onOrbitChangeClick}
          tabIndex={isVisible ? 0 : undefined}
          aria-label={t('infoMenu.showOrbits') || undefined}
        >
          {t('infoMenu.showOrbits')}
        </button>
      </div>
    </div>
  );
}

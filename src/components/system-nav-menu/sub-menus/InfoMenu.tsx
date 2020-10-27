import React, { useContext, FC } from "react";
import AppContext, { systemSize, SystemContext } from "../../../SystemContext";
import { getOnEnterPress } from "../../../utils/EventUtils";
import { CallbackFunction } from "../../../types";
import styles from "./InfoMenu.module.scss";

interface Props {
  orbitsVisible: boolean;
  onOrbitsVisibleChange(newOrbitsVisible: boolean): void;
  onChangeSystemSize(newContext: SystemContext): void;
}

const InfoMenu: FC<Props> = ({ orbitsVisible, onChangeSystemSize, onOrbitsVisibleChange }) => {
  const context = useContext(AppContext);
  const { orbitalPeriodMultiplier, distanceMultiplier, sizeMultiplier, satelliteDist } = context.multipliers;

  const daysPerSecond = 1 * orbitalPeriodMultiplier;
  const kmPerPixelDistance = Math.round(1 / distanceMultiplier).toLocaleString();
  const kmPerPixelSatellite = Math.round(1 / satelliteDist).toLocaleString();
  const kmPerPixelSize = Math.round(1 / sizeMultiplier).toLocaleString();
  const normaliseButtonStatus = systemSize.evenSpace === context ? ` ${styles.buttonActive}` : "";
  const orbitButtonStatus = orbitsVisible ? ` ${styles.buttonActive}` : "";

  const onOrbitChangeClick = (): void => onOrbitsVisibleChange(!orbitsVisible);

  const onSizeChangeClick: CallbackFunction = () => {
    const { enhancedVisibility, evenSpace } = systemSize;
    const systemSizeContext = evenSpace === context ? enhancedVisibility : evenSpace;
    onChangeSystemSize(systemSizeContext);
  };

  return (
    <>
      <div className={styles.heading}>Time</div>
      <div className={styles.stat}>{`${daysPerSecond} s = 1 day`}</div>
      <div className={styles.heading}>Distance Between Planets</div>
      <div className={styles.stat}>{`1 pixel = ${kmPerPixelDistance} km`}</div>
      <div className={styles.heading}>Distance Between Planets And Moons</div>
      <div className={styles.stat}>{`1 pixel = ${kmPerPixelSatellite} km`}</div>
      <div className={styles.heading}>Planet Size</div>
      <div className={styles.stat}>{`1 pixel = ${kmPerPixelSize} km`}</div>
      <div className={styles.buttonWrapper}>
        <div
          className={`${styles.button}${normaliseButtonStatus}`}
          onClick={onSizeChangeClick}
          onKeyPress={getOnEnterPress(onSizeChangeClick)}
          role="button"
          tabIndex={0}
        >
          Normalise Distance
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div
          className={`${styles.button}${orbitButtonStatus}`}
          onClick={onOrbitChangeClick}
          onKeyPress={getOnEnterPress(onOrbitChangeClick)}
          role="button"
          tabIndex={0}
        >
          Show Orbits
        </div>
      </div>
    </>
  );
};

export default InfoMenu;

import clsx from 'clsx';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import useClickAndEnterKeyDown from '../../../hooks/useClickAndEnterKeydown';
import styles from './PointOfInterestButton.module.scss';

interface Props {
  /** Whether the component is currently visible. */
  isVisible: boolean;
  /** Point of interest object. */
  pointOfInterest: { id: string };
  /** Whether the point of interest is currently being followed on screen. */
  isBeingFollowed: boolean;
  /** Click handler for when the button is clicked. */
  onPoiClick(): void;
}

/**
 * A button for points of interest. When Clicked the screen will follow the poi until
 * the button is clicked again or another poi is clicked.
 */
const PointOfInterestButton: FC<Props> = ({ isVisible, pointOfInterest, isBeingFollowed, onPoiClick }) => {
  const { t } = useTranslation();

  const [onClick, onEnter] = useClickAndEnterKeyDown(onPoiClick);
  const displayName = t(`pointsOfInterest.${pointOfInterest.id}`);
  return (
    <div key={pointOfInterest.id}>
      <div
        className={clsx(styles.navItem, { [styles.navItemFollowed]: isBeingFollowed })}
        onClick={onClick}
        onKeyDown={onEnter}
        role="button"
        tabIndex={isVisible ? 0 : undefined}
        aria-label={displayName}
      >
        {displayName}
      </div>
    </div>
  );
};

export default PointOfInterestButton;

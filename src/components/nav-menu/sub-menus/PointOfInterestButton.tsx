import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
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

  const displayName = t(`pointsOfInterest.${pointOfInterest.id}`);
  return (
    <button
      key={pointOfInterest.id}
      data-testid={`${pointOfInterest.id}-button`}
      className={clsx(styles.navItem, { [styles.navItemFollowed]: isBeingFollowed })}
      onClick={onPoiClick}
      tabIndex={isVisible ? 0 : undefined}
      aria-label={displayName}
    >
      <span>{displayName}</span>
    </button>
  );
};

export default PointOfInterestButton;

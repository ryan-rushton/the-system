import React, { FC } from 'react';
import clsx from 'clsx';

import { PointOfInterest } from '../../../App';
import useClickAndEnterKeyDown from '../../../hooks/useClickAndEnterKeydown';
import styles from './PointsOfInterestButton.module.scss';

interface Props {
  /** Point of interest object. */
  pointOfInterest: PointOfInterest;
  /** Whether the point of interest is currently being followed on screen. */
  isBeingFollowed: boolean;
  /** Click handler for when the button is clicked. */
  onPoiClick(): void;
}

/**
 * A button for points of interest. When Clicked the screen will follow the poi until
 * the button is clicked again or another poi is clicked.
 */
const PointOfInterestButton: FC<Props> = ({ pointOfInterest, isBeingFollowed, onPoiClick }) => {
  const title = isBeingFollowed ? 'Click again to stop following.' : undefined;

  const [onClick, onEnter] = useClickAndEnterKeyDown(onPoiClick);
  return (
    <div key={pointOfInterest.display}>
      <div
        className={clsx(styles.navItem, { [styles.navItemFollowed]: isBeingFollowed })}
        onClick={onClick}
        onKeyPress={onEnter}
        role="button"
        tabIndex={0}
        title={title}
        aria-label={pointOfInterest.display}
      >
        {pointOfInterest.display}
      </div>
    </div>
  );
};

export default PointOfInterestButton;

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, FC, useState, useRef, RefObject } from 'react';

import { getDistanceToTop } from '../../utils/DomUtil';
import NavMenuSubsection from './NavMenuSubsection';
import styles from './NavMenu.module.scss';
import InfoMenu from './sub-menus/InfoMenu';
import PointOfInterestButton from './sub-menus/PointOfInterestButton';
import { PointsOfInterestMap } from '../../PointsOfInterest';
import { SystemContext } from '../../SystemContext';
import useClickAndEnterKeyDown from '../../hooks/useClickAndEnterKeydown';

interface Props {
  /** Whether the red orbit lines are visible. */
  orbitsVisible: boolean;
  /** The collection of points of interest. */
  pointsOfInterestMap: PointsOfInterestMap;
  /** The point of interest currently being followed. */
  followedPointOfInterest?: { ref: RefObject<HTMLDivElement> };
  /** Change handler for whether the red orbit lines are visible. */
  onOrbitsVisibleChange(orbitsVisible: boolean): void;
  /** Change handler for normalising km per pixel. */
  onChangeSystemSize(systemSizeContext: SystemContext): void;
  /** A handler for following a point of interest around the solar system. */
  onFollowPointOfInterest(pointOfInterest: { ref: RefObject<HTMLDivElement> }): void;
}

type OpenSubsectionState = 'info' | 'nav' | undefined;

/**
 * A sliding nav menu. When the burger icon is clicked the menu will slide into view. Each section will slide
 * open on clicking the title for it, any other open section will be closed at this point.
 *
 * There are no unit tests for this unfortunately as all the logic is based around extracting details from refs.
 * TODO Browser tests
 */
const NavMenu: FC<Props> = ({
  orbitsVisible,
  pointsOfInterestMap,
  followedPointOfInterest,
  onChangeSystemSize,
  onOrbitsVisibleChange,
  onFollowPointOfInterest,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [openSubsection, setOpenSubsection] = useState<OpenSubsectionState>();
  const menuRef = useRef<HTMLDivElement>(null);

  const [onMenuClick, onMenuEnter] = useClickAndEnterKeyDown(() => setMenuVisible((oldState) => !oldState));
  const onSubsectionClick = (clicked: 'info' | 'nav') =>
    setOpenSubsection((oldState) => (clicked === oldState ? undefined : clicked));

  const transformStyles: CSSProperties = {};

  if (menuRef.current) {
    const maxHeight = `calc(100vh - ${getDistanceToTop(menuRef.current)}px)`;
    const visibleTransform = `translateX(calc(-8vw - ${menuRef.current.offsetWidth}px))`;
    transformStyles.maxHeight = maxHeight;
    transformStyles.transform = menuVisible ? visibleTransform : 'translateX(0px)';
  }

  return (
    <div data-testid="nav-menu" className={styles.nav}>
      <div className={styles.header}>
        <div className={styles.headerButton} onClick={onMenuClick} onKeyPress={onMenuEnter} role="button" tabIndex={0}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className={styles.menu} ref={menuRef} style={transformStyles}>
        <NavMenuSubsection
          title={'Info'}
          isVisible={openSubsection === 'info'}
          onHeaderClick={() => onSubsectionClick('info')}
        >
          <InfoMenu
            isVisible={openSubsection === 'info'}
            orbitsVisible={orbitsVisible}
            onChangeSystemSize={onChangeSystemSize}
            onOrbitsVisibleChange={onOrbitsVisibleChange}
          />
        </NavMenuSubsection>
        <NavMenuSubsection
          title={'Navigation'}
          isVisible={openSubsection === 'nav'}
          onHeaderClick={() => onSubsectionClick('nav')}
        >
          <>
            {Object.values(pointsOfInterestMap).map((poi) => (
              <PointOfInterestButton
                isVisible={openSubsection === 'nav'}
                key={poi.display}
                pointOfInterest={poi}
                isBeingFollowed={poi === followedPointOfInterest}
                onPoiClick={() => onFollowPointOfInterest(poi)}
              />
            ))}
          </>
        </NavMenuSubsection>
      </div>
    </div>
  );
};

export default NavMenu;

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, FC, useState, useRef, RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { getDistanceToTop } from '../../utils/DomUtil';
import NavMenuSubsection from './NavMenuSubsection';
import styles from './NavMenu.module.scss';
import InfoMenu from './sub-menus/InfoMenu';
import PointOfInterestButton from './sub-menus/PointOfInterestButton';
import { pointsOfInterest } from '../../PointsOfInterest';
import { SystemContext } from '../../context/SystemContext';
import useClickAndEnterKeyDown from '../../hooks/useClickAndEnterKeydown';

interface Props {
  /** Whether the red orbit lines are visible. */
  orbitsVisible: boolean;
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
  followedPointOfInterest,
  onChangeSystemSize,
  onOrbitsVisibleChange,
  onFollowPointOfInterest,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [openSubsection, setOpenSubsection] = useState<OpenSubsectionState>();
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [onMenuClick, onMenuEnter] = useClickAndEnterKeyDown(() => setMenuVisible((oldState) => !oldState));
  const onSubsectionClick = (clicked: 'info' | 'nav') =>
    setOpenSubsection((oldState) => (clicked === oldState ? undefined : clicked));

  const transformStyles: CSSProperties = {};

  if (menuRef.current) {
    const maxHeight = `calc(100vh - ${getDistanceToTop(menuRef.current)}px)`;
    transformStyles.maxHeight = maxHeight;
    // the 2vw is because we have a 2vw right indent on the navMenu style
    transformStyles.transform = menuVisible
      ? 'translateX(0px)'
      : `translateX(calc(${menuRef.current.offsetWidth}px + 2vw))`;
  }

  return (
    <div className={styles.nav}>
      <div className={styles.header}>
        <div
          data-testid="nav-menu-button"
          className={styles.headerButton}
          onClick={onMenuClick}
          onKeyPress={onMenuEnter}
          role="button"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div data-testid="nav-menu" className={styles.menu} ref={menuRef} style={transformStyles}>
        <NavMenuSubsection
          title={t('info')}
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
          title={t('navigation')}
          isVisible={openSubsection === 'nav'}
          onHeaderClick={() => onSubsectionClick('nav')}
        >
          <div className={styles.navButtons}>
            {Object.values(pointsOfInterest).map((poi) => (
              <PointOfInterestButton
                isBeingFollowed={poi === followedPointOfInterest}
                isVisible={openSubsection === 'nav'}
                key={poi.id}
                pointOfInterest={poi}
                onPoiClick={() => onFollowPointOfInterest(poi)}
              />
            ))}
          </div>
        </NavMenuSubsection>
      </div>
    </div>
  );
};

export default NavMenu;

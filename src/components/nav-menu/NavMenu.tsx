import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, FC, RefObject, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { pointsOfInterest } from '../../PointsOfInterest';
import { SystemContext } from '../../context/SystemContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { getDistanceToTop } from '../../utils/DomUtil';
import styles from './NavMenu.module.scss';
import NavMenuSubsection from './NavMenuSubsection';
import InfoMenu from './sub-menus/InfoMenu';
import PointOfInterestButton from './sub-menus/PointOfInterestButton';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const onMenuClick = useCallback(() => setMenuVisible((oldState) => !oldState), []);
  const onSubsectionClick = (clicked: 'info' | 'nav') =>
    setOpenSubsection((oldState) => (clicked === oldState ? undefined : clicked));
  useClickOutside(containerRef, menuVisible, () => setMenuVisible(false));

  // on first render we dont have the offset so just push it way off the screen
  const transformDistance = menuRef.current ? `calc(${menuRef.current.offsetWidth}px + 2vw)` : '100vw';

  const transformStyles: CSSProperties = {
    maxHeight: menuRef.current ? `calc(100vh - ${getDistanceToTop(menuRef.current)}px)` : undefined,
    // the 2vw is because we have a 2vw right indent on the navMenu style
    transform: menuVisible ? 'translateX(0px)' : `translateX(${transformDistance})`,
  };

  return (
    <div ref={containerRef} data-testid="nav-menu-container" className={styles.nav}>
      <div className={styles.header}>
        <button data-testid="nav-menu-button" className={styles.headerButton} onClick={onMenuClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div data-testid="nav-menu" className={styles.menu} ref={menuRef} style={transformStyles}>
        <NavMenuSubsection
          title={t('info')}
          isVisible={openSubsection === 'info'}
          canTabInto={menuVisible}
          onHeaderClick={() => onSubsectionClick('info')}
        >
          <InfoMenu
            isVisible={menuVisible && openSubsection === 'info'}
            orbitsVisible={orbitsVisible}
            onChangeSystemSize={onChangeSystemSize}
            onOrbitsVisibleChange={onOrbitsVisibleChange}
          />
        </NavMenuSubsection>
        <NavMenuSubsection
          title={t('navigation')}
          isVisible={openSubsection === 'nav'}
          canTabInto={menuVisible}
          onHeaderClick={() => onSubsectionClick('nav')}
        >
          <div className={styles.navButtons}>
            {Object.values(pointsOfInterest).map((poi) => (
              <PointOfInterestButton
                isBeingFollowed={poi === followedPointOfInterest}
                isVisible={menuVisible && openSubsection === 'nav'}
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

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, FC, useState, useRef, useCallback, ReactNode } from 'react';

import { getDistanceToTop } from '../../../utils/DomUtil';
import { getOnEnterPress } from '../../../utils/EventUtils';
import NavMenuSubsection from './NavMenuSubsection';
import styles from './NavMenu.module.scss';

interface Props {
  /** The menu elements. */
  elements: {
    /** The title for the menu element. This is always visible. */
    title: string;
    /** The content of the menu, this is visible one the title is clicked. */
    content: ReactNode;
  }[];
}

interface State {
  menuVisible: boolean;
  openMenuTitle?: string;
}

/**
 * A sliding nav menu. When the burger icon is clicked the menu will slide into view. Each section will slide
 * open on clicking the title for it, any other open section will be closed at this point.
 */
const NavMenu: FC<Props> = ({ elements }) => {
  const [{ menuVisible, openMenuTitle }, setState] = useState<State>({ menuVisible: false });
  const menuRef = useRef<HTMLDivElement>(null);

  const onMenuClick = useCallback(() => {
    setState(
      (prevState: State): State => ({
        ...prevState,
        menuVisible: !prevState.menuVisible,
      })
    );
  }, [setState]);

  const onSubsectionClick = useCallback(
    (openMenuTitle: string) => {
      setState(
        (prevState: State): State => ({
          ...prevState,
          openMenuTitle: openMenuTitle === prevState.openMenuTitle ? undefined : openMenuTitle,
        })
      );
    },
    [setState]
  );

  const transformStyles: CSSProperties = {};

  if (menuRef.current) {
    const maxHeight = `calc(100vh - ${getDistanceToTop(menuRef.current)}px)`;
    const visibleTransform = `translateX(calc(-8vw - ${menuRef.current.offsetWidth}px))`;
    transformStyles.maxHeight = maxHeight;
    transformStyles.transform = menuVisible ? visibleTransform : 'translateX(0px)';
  }

  return (
    <div className={styles.nav}>
      <div className={styles.header}>
        <div
          className={`${styles.headerButton}`}
          onClick={onMenuClick}
          onKeyPress={getOnEnterPress(onMenuClick)}
          role="button"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className={styles.menu} ref={menuRef} style={transformStyles}>
        {elements.map(({ title, content }) => (
          <NavMenuSubsection
            key={title}
            onClick={(): void => onSubsectionClick(title)}
            header={title}
            isVisible={title === openMenuTitle}
          >
            {content}
          </NavMenuSubsection>
        ))}
      </div>
    </div>
  );
};

export default NavMenu;

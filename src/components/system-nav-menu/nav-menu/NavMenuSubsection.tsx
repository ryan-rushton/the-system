import React, { ReactNode, FC, useRef } from 'react';

import styles from './NavMenu.module.scss';
import commonStyles from '../CommonStyles.module.scss';
import useClickAndEnterKeyDown from '../../../hooks/useClickAndEnterKeydown';

interface Props {
  header: ReactNode;
  isVisible: boolean;
  onHeaderClick(): void;
}

const NavMenuSubsection: FC<Props> = ({ children, header, isVisible, onHeaderClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [onClick, onEnter] = useClickAndEnterKeyDown(onHeaderClick);

  let actualHeight = 0;

  if (ref.current?.children) {
    for (const child of ref.current.children) {
      if (child instanceof HTMLElement) {
        actualHeight += child?.offsetHeight || 0;
      }
    }
  }

  return (
    <>
      <div
        className={`${commonStyles.button} ${styles.menuItemSubheader}`}
        onClick={onClick}
        onKeyDown={onEnter}
        role="button"
        tabIndex={0}
      >
        {header}
      </div>
      <div className={styles.menuItemBody} ref={ref} style={{ maxHeight: isVisible ? actualHeight : 0 }}>
        {children}
      </div>
    </>
  );
};

export default NavMenuSubsection;

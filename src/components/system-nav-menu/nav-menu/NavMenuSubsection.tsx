import React, { ReactNode, FC, useRef } from 'react';

import { getOnEnterPress } from '../../../utils/EventUtils';
import styles from './NavMenu.module.scss';
import commonStyles from '../CommonStyles.module.scss';

interface Props {
  header: ReactNode;
  isVisible: boolean;
  onClick(): void;
}

const NavMenuSubsection: FC<Props> = ({ children, header, isVisible, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
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
        onKeyPress={getOnEnterPress(onClick)}
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

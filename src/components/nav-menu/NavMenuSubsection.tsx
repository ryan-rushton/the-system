import React, { FC, useRef } from 'react';
import useClickAndEnterKeyDown from '../../hooks/useClickAndEnterKeydown';
import styles from './NavMenuSubsection.module.scss';

interface Props {
  title: string;
  isVisible: boolean;
  canTabInto: boolean;
  onHeaderClick(): void;
}

/**
 * This provides the up and down slide when opening the subsections.
 */
const NavMenuSubsection: FC<Props> = ({ children, title, isVisible, canTabInto, onHeaderClick }) => {
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
        className={styles.title}
        onClick={onClick}
        onKeyDown={onEnter}
        role="button"
        tabIndex={canTabInto ? 0 : undefined}
      >
        {title}
      </div>
      <div className={styles.content} ref={ref} style={{ maxHeight: isVisible ? actualHeight : 0 }}>
        {children}
      </div>
    </>
  );
};

export default NavMenuSubsection;

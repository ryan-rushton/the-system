import { FC, PropsWithChildren, useRef } from 'react';
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
const NavMenuSubsection: FC<PropsWithChildren<Props>> = ({ children, title, isVisible, canTabInto, onHeaderClick }) => {
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
    <div className={styles.subsection}>
      <button className={styles.title} onClick={onHeaderClick} tabIndex={canTabInto ? 0 : undefined}>
        {title}
      </button>
      <div className={styles.content} ref={ref} style={{ maxHeight: isVisible ? actualHeight : 0 }}>
        {children}
      </div>
    </div>
  );
};

export default NavMenuSubsection;

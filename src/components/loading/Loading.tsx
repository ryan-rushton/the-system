import React, { FC } from 'react';
import styles from './Loading.module.scss';

// TODO use SVG's instead of divs?
/** A loading page that has a few rotation orbs on orbit lines. This is intended to use the whole viewport. */
const Loading: FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.ringTwo}>
        <div className={styles.orbTwo} />
        <div className={styles.ringOne}>
          <div className={styles.orbOne} />
          <div className={styles.middleOrb} />
        </div>
      </div>
    </div>
  );
};

export default Loading;

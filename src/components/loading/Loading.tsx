import React, { FC } from 'react';
import styles from './Loading.module.scss';

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

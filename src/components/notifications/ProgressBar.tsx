import { motion } from 'framer-motion';
import React, { FC } from 'react';
import styles from './ProgressBar.module.scss';

interface Props {
  duration: number;
  onCompletion?(): void;
}

const ProgressBar: FC<Props> = ({ duration, onCompletion }) => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.progress}
        initial={{ width: '0%' }}
        animate={{ width: '100%', transition: { duration } }}
        onAnimationComplete={onCompletion}
      />
    </div>
  );
};

export default ProgressBar;

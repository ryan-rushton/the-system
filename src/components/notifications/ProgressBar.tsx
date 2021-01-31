import { motion } from 'framer-motion';
import React, { FC } from 'react';
import styles from './ProgressBar.module.scss';

interface Props {
  /** The time in seconds at which the animation will finish and onCompletion will be invoked. */
  duration?: number;
  /** A function that gets called after the duration has completed. */
  onCompletion?(): void;
}

/**
 * A animated bar to indicate that the notification will close itself after the nominated duration.
 */
const ProgressBar: FC<Props> = ({ duration, onCompletion }) => {
  if (duration === undefined) {
    return null;
  }

  return (
    <div data-testid="progress-bar" className={styles.container}>
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

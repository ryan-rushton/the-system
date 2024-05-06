import { motion } from 'framer-motion';
import styles from './ProgressBar.module.scss';

/**
 * A animated bar to indicate that the notification will close itself after the nominated duration.
 */
export function ProgressBar({
  duration,
  onCompletion,
}: {
  /** The time in seconds at which the animation will finish and onCompletion will be invoked. */
  duration?: number;
  /** A function that gets called after the duration has completed. */
  onCompletion?(): void;
}) {
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
}

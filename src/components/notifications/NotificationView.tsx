import clsx from 'clsx';
import { motion } from 'framer-motion';
import { CloseButton } from './CloseButton';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from './Icons';
import styles from './NotificationView.module.scss';
import { ProgressBar } from './ProgressBar';
import { UniqueNotification } from './notifications';

/**
 * A view for a single  This includes the close button and the progress bar.
 * When the progress bar fills the notification will close.
 */
export function NotificationView({
  notification: { severity, message, duration },
  onClose,
}: {
  /** The notification to show. */
  notification: UniqueNotification;
  /** Function to call when the close button is pressed or the duration runs out. */
  onClose(): void;
}) {
  return (
    <motion.li
      data-testid="notification-view"
      className={clsx(styles.notification, {
        [styles.success]: severity === 'success',
        [styles.info]: severity === 'info',
        [styles.warning]: severity === 'warning',
        [styles.error]: severity === 'error',
      })}
      initial={{ opacity: 0, scale: 0.3, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.3 },
      }}
    >
      <div className={styles.content}>
        {severity === 'error' && <ErrorIcon />}
        {severity === 'warning' && <WarningIcon />}
        {severity === 'info' && <InfoIcon />}
        {severity === 'success' && <SuccessIcon />}
        <div className={styles.message}>{message}</div>
        <CloseButton onClose={onClose} />
      </div>
      {duration !== undefined && <ProgressBar duration={duration} onCompletion={onClose} />}
    </motion.li>
  );
}

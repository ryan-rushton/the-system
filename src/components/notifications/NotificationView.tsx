import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import CloseButton from './CloseButton';
import { Error, Info, Success, Warning } from './Icons';
import { UniqueNotification } from './notifications';
import styles from './NotificationView.module.scss';
import ProgressBar from './ProgressBar';

interface Props {
  /** The notification to show. */
  notification: UniqueNotification;
  /** Function to call when the close button is pressed or the duration runs out. */
  onClose(): void;
}

/**
 * A view for a single  This includes the close button and the progress bar.
 * When the progress bar fills the notification will close.
 */
const NotificationView: FC<Props> = ({ notification: { severity, message, duration }, onClose }) => {
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
        {severity === 'error' && <Error />}
        {severity === 'warning' && <Warning />}
        {severity === 'info' && <Info />}
        {severity === 'success' && <Success />}
        <div className={styles.message}>{message}</div>
        <CloseButton onClose={onClose} />
      </div>
      {duration !== undefined && <ProgressBar duration={duration} onCompletion={onClose} />}
    </motion.li>
  );
};

export default NotificationView;

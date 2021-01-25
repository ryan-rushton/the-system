import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import CloseButton from './CloseButton';
import { UniqueNotification } from './notifications';
import styles from './NotificationView.module.scss';
import ProgressBar from './ProgressBar';

interface Props {
  notification: UniqueNotification;
  onClose(): void;
}

/**
 * A view for a single notification. This includes the close button and the progress bar.
 * When the progress bar fills the notification will close.
 */
const NotificationView: FC<Props> = ({ notification, onClose }) => {
  return (
    <motion.li
      className={clsx(styles.notification, {
        [styles.success]: notification.severity === 'success',
        [styles.info]: notification.severity === 'info',
        [styles.warning]: notification.severity === 'warning',
        [styles.error]: notification.severity === 'error',
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
        <div className={styles.message}>{notification.message}</div>
        <CloseButton onClose={onClose} />
      </div>
      <ProgressBar duration={notification.duration} onCompletion={onClose} />
    </motion.li>
  );
};

export default NotificationView;

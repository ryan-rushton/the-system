import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import CloseButton from './CloseButton';
import { notifications$, UniqueNotification } from './notifications';
import styles from './NotificationView.module.scss';

/**
 * A view for notifications. This should be placed on either side of the screen. It will take up a 20vw column that
 * is nearly the height of the screen.
 *
 * Notifications will have a close icon and follower notifications will disappear when a new follower notification
 * is shown.
 */
const NotificationView: FC = () => {
  const [notifications, setNotifications] = useState<UniqueNotification[]>([]);

  // subscribe to the notifications stream and update state when new ones come in.
  useEffect(() => {
    notifications$.subscribe((newNotification: UniqueNotification): void => {
      setNotifications((oldState) => {
        const newState =
          newNotification.origin === 'follower' ? oldState.filter((n) => n.origin !== 'follower') : [...oldState];
        return [...newState, newNotification];
      });
    });

    return (): void => notifications$.unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.messageList}>
        <AnimatePresence initial={false}>
          {notifications.map((notification) => (
            <motion.li
              key={notification.id}
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
              <div className={styles.message}>{notification.message}</div>
              <CloseButton
                onClose={() => {
                  setNotifications((oldState) => oldState.filter((n) => n.id !== notification.id));
                }}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default NotificationView;

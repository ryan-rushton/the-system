import { AnimatePresence } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import NotificationView from './NotificationView';
import styles from './NotificationsList.module.scss';
import { UniqueNotification, notifications$ } from './notifications';

/**
 * A view for notifications. This should be placed on either side of the screen. It will take up a 20vw column that
 * is nearly the height of the screen.
 *
 * Notifications will have a close icon and follower notifications will disappear when a new follower notification
 * is shown.
 */
const NotificationsList: FC = () => {
  const [notifications, setNotifications] = useState<UniqueNotification[]>([]);

  // subscribe to the notifications stream and update state when new ones come in.
  useEffect(() => {
    const subscription = notifications$.subscribe((newNotification: UniqueNotification): void => {
      setNotifications((oldState) => {
        const newState =
          newNotification.origin === 'follower' ? oldState.filter((n) => n.origin !== 'follower') : [...oldState];
        return [...newState, newNotification];
      });
    });

    return (): void => subscription.unsubscribe();
  }, []);

  return (
    <div data-testid="notifications-list" className={styles.container}>
      <ul className={styles.messageList}>
        <AnimatePresence initial={false}>
          {notifications.map((notification) => (
            <NotificationView
              key={notification.id}
              notification={notification}
              onClose={() => {
                setNotifications((oldState) => oldState.filter((n) => n.id !== notification.id));
              }}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default NotificationsList;

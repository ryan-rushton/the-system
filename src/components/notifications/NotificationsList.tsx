import { AnimatePresence } from 'framer-motion';
import { lazy, useEffect, useState } from 'react';
import styles from './NotificationsList.module.scss';
import { notifications$, type UniqueNotification } from './notifications';

const LazyNotificationView = lazy(async () => {
  const { NotificationView } = await import('./NotificationView');
  return { default: NotificationView };
});

/**
 * A view for notifications. This should be placed on either side of the screen. It will take up a 20vw column that
 * is nearly the height of the screen.
 *
 * Notifications will have a close icon and follower notifications will disappear when a new follower notification
 * is shown.
 */
export function NotificationsList() {
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

    return (): void => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div data-testid="notifications-list" className={styles.container}>
      <ul className={styles.messageList}>
        <AnimatePresence initial={false}>
          {notifications.map((notification) => (
            <LazyNotificationView
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
}

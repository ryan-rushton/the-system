import { Subject } from 'rxjs';

// An id for each notification so we know which ones to clear.
let id = 0;

export interface Notification {
  /** The severity of the notification, this will determine the colour displayed. */
  severity: 'info' | 'warning' | 'error' | 'success';
  /** The notification message to show the user. */
  message: string;
  /** Where the notification originated from, allows us to conditionally clear old notifications. */
  origin: string;
}

export interface UniqueNotification extends Notification {
  /** A unique identifier for the notification. */
  id: number;
}

/** An rxjs Subject for notifications. */
export const notifications$ = new Subject<UniqueNotification>();

/** Queues a new notification to be shown in the notification view. */
export const showNotification = (nextNotification: Notification): void => {
  notifications$.next({ ...nextNotification, id: id++ });
};

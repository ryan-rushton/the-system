import { describe, expect, test, vi } from 'vitest';
import { Notification, notifications$, showNotification } from './notifications';

describe('notifications', () => {
  test('it sends out notifications', () => {
    const subFn = vi.fn();
    const notification: Notification = { origin: 'origin', severity: 'info', message: "I'm a notification!" };

    notifications$.subscribe(subFn);
    showNotification(notification);

    expect(subFn).toHaveBeenCalledWith({ ...notification, id: 0 });
  });

  test('it increments the id correctly', () => {
    const subFn = vi.fn();
    const notification: Notification = { origin: 'origin', severity: 'info', message: "I'm a notification!" };

    notifications$.subscribe(subFn);
    showNotification(notification);
    const id1 = subFn.mock.calls[0][0].id;

    showNotification(notification);
    const id2 = subFn.mock.calls[1][0].id;

    expect(id2 - id1).toBe(1);
  });
});

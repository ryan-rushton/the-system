import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { showNotification } from './notifications';
import NotificationsList from './NotificationsList';

describe('NotificationsList', () => {
  afterEach(cleanup);

  test('it renders', () => {
    render(<NotificationsList />);

    expect(screen.getByTestId('notifications-list')).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    render(<NotificationsList />);

    expect(screen.getByTestId('notifications-list')).toMatchSnapshot();
  });

  test('it renders a notification', async () => {
    render(<NotificationsList />);
    act(() => showNotification({ severity: 'error', message: 'Some error!' }));
    await screen.findByTestId('notification-view');
    expect(screen.getByText(/^Some error!$/)).toBeInTheDocument();
  });

  test('can close notification', async () => {
    render(<NotificationsList />);

    // show notification and check it's present
    act(() => showNotification({ severity: 'error', message: 'Some error!' }));
    await screen.findByTestId('notification-view');
    expect(screen.getByText(/^Some error!$/)).toBeInTheDocument();

    // click the close button and check it goes away
    act(() => userEvent.click(screen.getByTestId('close-button')));
    await waitFor(() => expect(screen.queryByText(/^Some error!$/)).not.toBeInTheDocument());
  });
});

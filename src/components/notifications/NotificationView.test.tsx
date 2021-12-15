import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import NotificationView from './NotificationView';

describe('NotificationView', () => {
  afterEach(cleanup);

  test('it renders', () => {
    render(
      <NotificationView
        notification={{ id: 1, severity: 'error', message: 'Some error!', origin: 'origin' }}
        onClose={jest.fn()}
      />
    );

    expect(screen.getByTestId('notification-view')).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    render(
      <NotificationView
        notification={{ id: 1, severity: 'error', message: 'Some error!', origin: 'origin' }}
        onClose={jest.fn()}
      />
    );

    expect(screen.getByTestId('notification-view')).toMatchSnapshot();
  });

  test('it renders the error icon correctly', () => {
    render(
      <NotificationView
        notification={{ id: 1, severity: 'error', message: 'Some error!', origin: 'origin' }}
        onClose={jest.fn()}
      />
    );

    expect(screen.getByTestId('error-icon')).toBeInTheDocument();
  });

  test('it renders the warning icon correctly', () => {
    render(
      <NotificationView
        notification={{ id: 1, severity: 'warning', message: 'Some warning!', origin: 'origin' }}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByTestId('warning-icon')).toBeInTheDocument();
  });

  test('it renders the info icon correctly', () => {
    render(
      <NotificationView
        notification={{ id: 1, severity: 'info', message: 'Some info!', origin: 'origin' }}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
  });

  test('it renders the success icon correctly', () => {
    render(
      <NotificationView
        notification={{ id: 1, severity: 'success', message: 'Some success!', origin: 'origin' }}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByTestId('success-icon')).toBeInTheDocument();
  });
});

import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import NotificationView from './NotificationView';

describe('NotificationView', () => {
  afterEach(cleanup);

  test('it renders', () => {
    render(<NotificationView notification={{ severity: 'error', message: 'Some error!' }} />);

    expect(screen.getByTestId('notification-view')).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    render(<NotificationView notification={{ severity: 'error', message: 'Some error!' }} />);

    expect(screen.getByTestId('notification-view')).toMatchSnapshot();
  });

  test('it renders the error icon correctly', () => {
    render(<NotificationView notification={{ severity: 'error', message: 'Some error!' }} />);

    expect(screen.getByTestId('error-icon')).toBeInTheDocument();
  });

  test('it renders the warning icon correctly', () => {
    render(<NotificationView notification={{ severity: 'warning', message: 'Some warning!' }} />);

    expect(screen.getByTestId('warning-icon')).toBeInTheDocument();
  });

  test('it renders the info icon correctly', () => {
    render(<NotificationView notification={{ severity: 'info', message: 'Some info!' }} />);

    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
  });

  test('it renders the success icon correctly', () => {
    render(<NotificationView notification={{ severity: 'success', message: 'Some success!' }} />);

    expect(screen.getByTestId('success-icon')).toBeInTheDocument();
  });
});

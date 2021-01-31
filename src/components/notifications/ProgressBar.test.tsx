import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import ProgressBar from './ProgressBar';

describe('NavMenu', () => {
  afterEach(cleanup);

  test('it renders', () => {
    render(<ProgressBar duration={0} />);

    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    const { container } = render(<ProgressBar duration={0} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('it renders nothing when no duration', () => {
    render(<ProgressBar />);

    expect(screen.queryByTestId('progress-bar')).not.toBeInTheDocument();
  });
});

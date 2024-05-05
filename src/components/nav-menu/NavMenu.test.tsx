import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NavMenu from './NavMenu';

describe('NavMenu', () => {
  it('renders', () => {
    render(
      <NavMenu
        orbitsVisible={false}
        onChangeSystemSize={vi.fn()}
        onFollowPointOfInterest={vi.fn()}
        onOrbitsVisibleChange={vi.fn()}
      />,
    );

    expect(screen.getByTestId('nav-menu-button')).toBeInTheDocument();
  });

  it('it matches snapshot', () => {
    render(
      <NavMenu
        orbitsVisible={false}
        onChangeSystemSize={vi.fn()}
        onFollowPointOfInterest={vi.fn()}
        onOrbitsVisibleChange={vi.fn()}
      />,
    );

    expect(screen.getByTestId('nav-menu-container')).toMatchSnapshot();
  });
});

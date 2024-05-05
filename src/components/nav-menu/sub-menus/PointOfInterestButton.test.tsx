import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import PointOfInterestButton from './PointOfInterestButton';

describe('PointOfInterestButton', () => {
  test('it renders', () => {
    const poi = { id: 'somePoint', ref: createRef() };
    render(
      <PointOfInterestButton pointOfInterest={poi} isVisible={true} isBeingFollowed={false} onPoiClick={vi.fn()} />,
    );
    const element = screen.getByText(/^Some point$/);

    expect(element).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    const poi = { id: 'somePoint', ref: createRef() };
    render(
      <PointOfInterestButton pointOfInterest={poi} isVisible={true} isBeingFollowed={false} onPoiClick={vi.fn()} />,
    );

    expect(screen.getByTestId('somePoint-button')).toMatchSnapshot();
  });

  test('it changes orbits visible when Show Orbits clicked', async () => {
    const poi = { id: 'somePoint', ref: createRef() };
    const onPoiClick = vi.fn();

    render(
      <PointOfInterestButton pointOfInterest={poi} isVisible={true} isBeingFollowed={false} onPoiClick={onPoiClick} />,
    );

    await userEvent.click(screen.getByText(/^Some point$/));

    expect(onPoiClick).toHaveBeenCalledTimes(1);
  });
});

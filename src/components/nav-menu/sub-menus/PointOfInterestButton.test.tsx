import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import PointOfInterestButton from './PointOfInterestButton';

describe('PointOfInterestButton', () => {
  afterEach(cleanup);

  test('it renders', () => {
    const poi = { id: 'somePoint', ref: React.createRef() };
    render(
      <PointOfInterestButton pointOfInterest={poi} isVisible={true} isBeingFollowed={false} onPoiClick={jest.fn()} />,
    );
    const element = screen.getByText(/^Some point$/);

    expect(element).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    const poi = { id: 'somePoint', ref: React.createRef() };
    render(
      <PointOfInterestButton pointOfInterest={poi} isVisible={true} isBeingFollowed={false} onPoiClick={jest.fn()} />,
    );

    expect(screen.getByTestId('somePoint-button')).toMatchSnapshot();
  });

  test('it changes orbits visible when Show Orbits clicked', async () => {
    const poi = { id: 'somePoint', ref: React.createRef() };
    const onPoiClick = jest.fn();

    render(
      <PointOfInterestButton pointOfInterest={poi} isVisible={true} isBeingFollowed={false} onPoiClick={onPoiClick} />,
    );

    await userEvent.click(screen.getByText(/^Some point$/));

    expect(onPoiClick).toHaveBeenCalledTimes(1);
  });
});

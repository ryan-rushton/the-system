import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PointOfInterestButton from './PointOfInterestButton';

describe('PointOfInterestButton', () => {
  test('it renders', () => {
    const poi = { display: 'Some point', ref: React.createRef() };
    render(<PointOfInterestButton pointOfInterest={poi} isBeingFollowed={false} onPoiClick={jest.fn()} />);
    const element = screen.getByText(poi.display);

    expect(element).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    const poi = { display: 'Some point', ref: React.createRef() };
    const { container } = render(
      <PointOfInterestButton pointOfInterest={poi} isBeingFollowed={false} onPoiClick={jest.fn()} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('it changes orbits visible when Show Orbits clicked', () => {
    const poi = { display: 'Some point', ref: React.createRef() };
    const onPoiClick = jest.fn();

    render(<PointOfInterestButton pointOfInterest={poi} isBeingFollowed={false} onPoiClick={onPoiClick} />);

    userEvent.click(screen.getByText(poi.display));

    expect(onPoiClick).toBeCalledTimes(1);
  });

  test('it changes orbits visible when Show Orbits enter pressed', () => {
    const poi = { display: 'Some point', ref: React.createRef() };
    const onPoiClick = jest.fn();

    render(<PointOfInterestButton pointOfInterest={poi} isBeingFollowed={false} onPoiClick={onPoiClick} />);

    fireEvent.keyDown(screen.getByText(poi.display), { key: 'Enter', keyCode: 13 });

    expect(onPoiClick).toBeCalledTimes(1);
  });
});

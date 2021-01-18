import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InfoMenu from './InfoMenu';
import AppContext, { systemSize } from '../../../context/SystemContext';

describe('InfoMenu', () => {
  test('it renders', () => {
    render(<InfoMenu orbitsVisible={false} onOrbitsVisibleChange={jest.fn()} onChangeSystemSize={jest.fn()} />);
    const element = screen.getByTestId('InfoMenu.tsx');

    expect(element).toBeInTheDocument();
  });

  test('it changes orbits visible when Show Orbits clicked', () => {
    const onOrbitsChange = jest.fn();
    render(<InfoMenu orbitsVisible={false} onOrbitsVisibleChange={onOrbitsChange} onChangeSystemSize={jest.fn()} />);
    userEvent.click(screen.getByText(/^Show Orbits$/));

    expect(onOrbitsChange).toBeCalledTimes(1);
    expect(onOrbitsChange).toBeCalledWith(true);
  });

  test('it changes orbits visible when Show Orbits enter pressed', () => {
    const onOrbitsChange = jest.fn();
    render(<InfoMenu orbitsVisible={false} onOrbitsVisibleChange={onOrbitsChange} onChangeSystemSize={jest.fn()} />);

    fireEvent.keyDown(screen.getByText(/^Show Orbits$/), { key: 'Enter' });

    expect(onOrbitsChange).toBeCalledTimes(1);
    expect(onOrbitsChange).toBeCalledWith(true);
  });

  test('it changes system size when Normalise Distance clicked', () => {
    const onChangeSystemSize = jest.fn();
    render(
      <InfoMenu orbitsVisible={false} onOrbitsVisibleChange={jest.fn()} onChangeSystemSize={onChangeSystemSize} />
    );
    userEvent.click(screen.getByText(/^Normalise Distance$/));

    expect(onChangeSystemSize).toBeCalledTimes(1);
    expect(onChangeSystemSize).toBeCalledWith(systemSize.evenSpace);
  });

  test('it changes system size when Normalise Distance enter pressed', () => {
    const onChangeSystemSize = jest.fn();
    render(
      <InfoMenu orbitsVisible={false} onOrbitsVisibleChange={jest.fn()} onChangeSystemSize={onChangeSystemSize} />
    );
    fireEvent.keyDown(screen.getByText(/^Normalise Distance$/), { key: 'Enter' });

    expect(onChangeSystemSize).toBeCalledTimes(1);
    expect(onChangeSystemSize).toBeCalledWith(systemSize.evenSpace);
  });

  test('it has correct days per second for enhanced visibility context', () => {
    render(<InfoMenu orbitsVisible={false} onOrbitsVisibleChange={jest.fn()} onChangeSystemSize={jest.fn()} />);

    const timeDetails = screen.getByTestId('time');

    expect(timeDetails).toHaveTextContent('1 s = 1 day');
  });

  test('it has correct days per second for even size context', () => {
    render(
      <AppContext.Provider value={systemSize.evenSpace}>
        <InfoMenu orbitsVisible={false} onOrbitsVisibleChange={jest.fn()} onChangeSystemSize={jest.fn()} />
      </AppContext.Provider>
    );

    const timeDetails = screen.getByTestId('time');

    expect(timeDetails).toHaveTextContent('20 s = 1 day');
  });

  test('it has correct planet distance for enhanced visibility context', () => {
    render(<InfoMenu orbitsVisible={false} onOrbitsVisibleChange={jest.fn()} onChangeSystemSize={jest.fn()} />);

    const timeDetails = screen.getByTestId('planet-distance');

    expect(timeDetails).toHaveTextContent('1 pixel = 100,000 km');
  });

  test('it has correct planet distance for even size context', () => {
    render(
      <AppContext.Provider value={systemSize.evenSpace}>
        <InfoMenu orbitsVisible={false} onOrbitsVisibleChange={jest.fn()} onChangeSystemSize={jest.fn()} />
      </AppContext.Provider>
    );

    const timeDetails = screen.getByTestId('planet-distance');

    expect(timeDetails).toHaveTextContent('1 pixel = 2,000 km');
  });

  test('it has correct satellite distance for enhanced visibility context', () => {
    render(<InfoMenu orbitsVisible={false} onOrbitsVisibleChange={jest.fn()} onChangeSystemSize={jest.fn()} />);

    const timeDetails = screen.getByTestId('satellite-distance');

    expect(timeDetails).toHaveTextContent('1 pixel = 10,000 km');
  });

  test('it has correct satellite distance for even size context', () => {
    render(
      <AppContext.Provider value={systemSize.evenSpace}>
        <InfoMenu orbitsVisible={false} onOrbitsVisibleChange={jest.fn()} onChangeSystemSize={jest.fn()} />
      </AppContext.Provider>
    );

    const timeDetails = screen.getByTestId('satellite-distance');

    expect(timeDetails).toHaveTextContent('1 pixel = 2,000 km');
  });

  test('it has correct planet size for enhanced visibility context', () => {
    render(<InfoMenu orbitsVisible={false} onOrbitsVisibleChange={jest.fn()} onChangeSystemSize={jest.fn()} />);

    const timeDetails = screen.getByTestId('planet-size');

    expect(timeDetails).toHaveTextContent('1 pixel = 2,000 km');
  });

  test('it has correct planet size for even size context', () => {
    render(
      <AppContext.Provider value={systemSize.evenSpace}>
        <InfoMenu orbitsVisible={false} onOrbitsVisibleChange={jest.fn()} onChangeSystemSize={jest.fn()} />
      </AppContext.Provider>
    );

    const timeDetails = screen.getByTestId('planet-size');

    expect(timeDetails).toHaveTextContent('1 pixel = 2,000 km');
  });
});

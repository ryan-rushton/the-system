import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { AppContext, systemSize } from '../../../context/SystemContext';
import { InfoMenu } from './InfoMenu';

describe('InfoMenu', () => {
  test('it renders', () => {
    render(
      <InfoMenu orbitsVisible={false} isVisible={true} onOrbitsVisibleChange={vi.fn()} onChangeSystemSize={vi.fn()} />,
    );
    const element = screen.getByTestId('info-menu');

    expect(element).toBeInTheDocument();
  });

  test('it matches snapshot', () => {
    render(
      <InfoMenu orbitsVisible={false} isVisible={true} onOrbitsVisibleChange={vi.fn()} onChangeSystemSize={vi.fn()} />,
    );

    expect(screen.getByTestId('info-menu')).toMatchSnapshot();
  });

  test('it changes orbits visible when Show Orbits clicked', async () => {
    const onOrbitsChange = vi.fn();
    render(
      <InfoMenu
        orbitsVisible={false}
        isVisible={true}
        onOrbitsVisibleChange={onOrbitsChange}
        onChangeSystemSize={vi.fn()}
      />,
    );
    await userEvent.click(screen.getByText(/^Show Orbits$/));

    expect(onOrbitsChange).toHaveBeenCalledTimes(1);
    expect(onOrbitsChange).toHaveBeenCalledWith(true);
  });

  test('it changes system size when Normalise Distance clicked', async () => {
    const onChangeSystemSize = vi.fn();
    render(
      <InfoMenu
        orbitsVisible={false}
        isVisible={true}
        onOrbitsVisibleChange={vi.fn()}
        onChangeSystemSize={onChangeSystemSize}
      />,
    );
    await userEvent.click(screen.getByText(/^Normalise Distance$/));

    expect(onChangeSystemSize).toHaveBeenCalledTimes(1);
    expect(onChangeSystemSize).toHaveBeenCalledWith(systemSize.evenSpace);
  });

  test('it has correct days per second for enhanced visibility context', () => {
    render(
      <InfoMenu orbitsVisible={false} isVisible={true} onOrbitsVisibleChange={vi.fn()} onChangeSystemSize={vi.fn()} />,
    );

    const timeDetails = screen.getByTestId('time');

    expect(timeDetails).toHaveTextContent('1 s = 1 day');
  });

  test('it has correct days per second for even size context', () => {
    render(
      <AppContext.Provider value={systemSize.evenSpace}>
        <InfoMenu orbitsVisible={false} isVisible={true} onOrbitsVisibleChange={vi.fn()} onChangeSystemSize={vi.fn()} />
      </AppContext.Provider>,
    );

    const timeDetails = screen.getByTestId('time');

    expect(timeDetails).toHaveTextContent('20 s = 1 day');
  });

  test('it has correct planet distance for enhanced visibility context', () => {
    render(
      <InfoMenu orbitsVisible={false} isVisible={true} onOrbitsVisibleChange={vi.fn()} onChangeSystemSize={vi.fn()} />,
    );

    const timeDetails = screen.getByTestId('planet-distance');

    expect(timeDetails).toHaveTextContent('1 pixel = 100,000 km');
  });

  test('it has correct planet distance for even size context', () => {
    render(
      <AppContext.Provider value={systemSize.evenSpace}>
        <InfoMenu orbitsVisible={false} isVisible={true} onOrbitsVisibleChange={vi.fn()} onChangeSystemSize={vi.fn()} />
      </AppContext.Provider>,
    );

    const timeDetails = screen.getByTestId('planet-distance');

    expect(timeDetails).toHaveTextContent('1 pixel = 2,000 km');
  });

  test('it has correct satellite distance for enhanced visibility context', () => {
    render(
      <InfoMenu orbitsVisible={false} isVisible={true} onOrbitsVisibleChange={vi.fn()} onChangeSystemSize={vi.fn()} />,
    );

    const timeDetails = screen.getByTestId('satellite-distance');

    expect(timeDetails).toHaveTextContent('1 pixel = 10,000 km');
  });

  test('it has correct satellite distance for even size context', () => {
    render(
      <AppContext.Provider value={systemSize.evenSpace}>
        <InfoMenu orbitsVisible={false} isVisible={true} onOrbitsVisibleChange={vi.fn()} onChangeSystemSize={vi.fn()} />
      </AppContext.Provider>,
    );

    const timeDetails = screen.getByTestId('satellite-distance');

    expect(timeDetails).toHaveTextContent('1 pixel = 2,000 km');
  });

  test('it has correct planet size for enhanced visibility context', () => {
    render(
      <InfoMenu orbitsVisible={false} isVisible={true} onOrbitsVisibleChange={vi.fn()} onChangeSystemSize={vi.fn()} />,
    );

    const timeDetails = screen.getByTestId('planet-size');

    expect(timeDetails).toHaveTextContent('1 pixel = 2,000 km');
  });

  test('it has correct planet size for even size context', () => {
    render(
      <AppContext.Provider value={systemSize.evenSpace}>
        <InfoMenu orbitsVisible={false} isVisible={true} onOrbitsVisibleChange={vi.fn()} onChangeSystemSize={vi.fn()} />
      </AppContext.Provider>,
    );

    const timeDetails = screen.getByTestId('planet-size');

    expect(timeDetails).toHaveTextContent('1 pixel = 2,000 km');
  });
});

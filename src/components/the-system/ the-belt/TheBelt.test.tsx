import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import TheBelt from './TheBelt';

describe('TheBelt', () => {
  test('it renders', () => {
    render(<TheBelt />);
    expect(screen.getByTestId('the-belt')).toBeInTheDocument();
  });

  test('the belt cache works', () => {
    const initialRenderStart = performance.now();
    const { rerender } = render(<TheBelt />);
    const initialRenderTime = performance.now() - initialRenderStart;

    console.info(`Initial render of the belt took ${initialRenderTime}ms`);

    const secondRenderStart = performance.now();
    rerender(<TheBelt />);
    const secondRenderTime = performance.now() - secondRenderStart;

    console.info(`Second render of the belt took ${secondRenderTime}ms`);

    // expected times are around 3s and 10ms which gives 0.003. This gives us plenty of leeway
    expect(secondRenderTime / initialRenderTime).toBeLessThan(0.01);
  });

  test('it renders two layers', () => {
    render(<TheBelt />);
    // two layers of 7,500 rocks
    expect(screen.getAllByTestId('belt-rock').length).toBe(15_000);
  });

  test('it renders one ref', () => {
    render(<TheBelt />);
    // throws if there is more than one or none
    expect(screen.getByTestId('belt-ref')).toBeInTheDocument();
  });
});

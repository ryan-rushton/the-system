import { type CSSProperties, type RefObject } from 'react';

/** The number of divs each layer of the belt renders */
const ROCK_COUNT = 7_500;

const ROCK_COLOUR = '#d2d2d2';

/**
 * A single layer of divs that make up the asteroid belt.
 */
export function BeltLayer({
  innerBoundary,
  outerBoundary,
  scrollToRef,
}: Readonly<{
  /** The inner boundary for the belt. */
  innerBoundary: number;
  /** The outer boundary of the belt. */
  outerBoundary: number;
  /** The ref to place in the belt so we can scroll to the edge of the belt. */
  scrollToRef?: RefObject<HTMLDivElement | null>;
}>) {
  const rocks = [];
  const beltWidth = outerBoundary - innerBoundary;

  for (let i = 0; i < ROCK_COUNT; i += 1) {
    // Distance from the center of the sun
    // eslint-disable-next-line sonarjs/pseudo-random
    const distance = innerBoundary + beltWidth * Math.sin(Math.PI * Math.random());
    // Randomise the starting angular position.
    // eslint-disable-next-line sonarjs/pseudo-random
    const angularPosition = 2 * Math.PI * Math.random();
    // Randomise the size between 1 and 2 pixels
    // eslint-disable-next-line sonarjs/pseudo-random
    const size = 1 + Math.random();

    // x & y coordinates relative to the center of the sun. Probably not needed but they make it clear how left
    // and top are calculated
    const x = distance * Math.cos(angularPosition);
    const y = distance * Math.sin(angularPosition);

    // By adding outerBoundary we are simulating starting at the center of the sun, x/y can be positive or negative.
    const left = outerBoundary + x;
    const top = outerBoundary + y;

    const style: CSSProperties = {
      backgroundColor: ROCK_COLOUR,
      height: size,
      left,
      // eslint-disable-next-line sonarjs/pseudo-random
      opacity: 0.5 * (1 + Math.random()),
      position: 'absolute',
      top,
      width: size,
    };

    rocks.push(<div data-testid="belt-rock" key={`belt-rock-${i}`} style={style} ref={scrollToRef} />);
  }

  // We add an extra div with a ref to scroll to if scrollToRef is present.
  // It starts at the left outer most edge of the belt
  if (scrollToRef) {
    const style: CSSProperties = {
      backgroundColor: ROCK_COLOUR,
      height: 2,
      left: 0,
      opacity: 0.9,
      position: 'absolute',
      top: outerBoundary,
      width: 2,
    };

    rocks.push(<div data-testid="belt-ref" key="belt-ref" style={style} ref={scrollToRef} />);
  }

  return <>{rocks}</>;
}

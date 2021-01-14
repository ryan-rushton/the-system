import React, { FC, RefObject } from 'react';

import BeltRock from './BeltRock';

const ROCK_COUNT = 15000;

interface Props {
  innerBoundary: number;
  outerBoundary: number;
  size: number;
  scrollToRef?: RefObject<HTMLDivElement>;
}

const BeltLayer: FC<Props> = ({ innerBoundary, outerBoundary, size, scrollToRef }) => {
  const rocks = [];

  for (let i = 0; i < ROCK_COUNT / 2; i += 1) {
    const distance = innerBoundary + size * Math.sin(Math.PI * Math.random());
    const angularPosition = Math.random() * 360;

    const values = {
      x: distance * Math.cos(angularPosition),
      y: distance * -Math.sin(angularPosition),
      luminosity: 0.5 * (1 + Math.random()),
      size: 1 + Math.random(),
      beltRadius: outerBoundary,
    };

    rocks.push(<BeltRock {...values} key={`belt-rock-${i}`} />);
  }

  if (scrollToRef) {
    const values = {
      x: innerBoundary,
      y: innerBoundary,
      luminosity: 0.5 * (1 + Math.random()),
      size: 1 + Math.random(),
      beltRadius: outerBoundary,
      scrollToRef: scrollToRef,
    };
    rocks.push(<BeltRock {...values} key="belt-ref" />);
  }

  return <>{rocks}</>;
};

export default BeltLayer;

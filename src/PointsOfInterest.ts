import React, { RefObject } from 'react';

export interface PointOfInterest {
  ref: RefObject<HTMLDivElement>;
  display: string;
}

type SystemNames =
  | 'sun'
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'theBelt'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto';

export type PointsOfInterestMap = { [K in SystemNames]: PointOfInterest };

export const pointsOfInterest: PointsOfInterestMap = {
  sun: {
    ref: React.createRef(),
    display: 'Sun',
  },
  mercury: {
    ref: React.createRef(),
    display: 'Mercury',
  },
  venus: {
    ref: React.createRef(),
    display: 'Venus',
  },
  earth: {
    ref: React.createRef(),
    display: 'Earth',
  },
  mars: {
    ref: React.createRef(),
    display: 'Mars',
  },
  theBelt: {
    ref: React.createRef(),
    display: 'The Belt',
  },
  jupiter: {
    ref: React.createRef(),
    display: 'Jupiter',
  },
  saturn: {
    ref: React.createRef(),
    display: 'Saturn',
  },
  uranus: {
    ref: React.createRef(),
    display: 'Uranus',
  },
  neptune: {
    ref: React.createRef(),
    display: 'Neptune',
  },
  pluto: {
    ref: React.createRef(),
    display: 'Pluto',
  },
};

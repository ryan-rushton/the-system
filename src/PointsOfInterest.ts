import React from 'react';

export const pointsOfInterest = {
  sun: {
    ref: React.createRef<HTMLDivElement>(),
    display: 'Sun',
    radius: 695508,
    distance: 0,
    orbitalPeriod: 1,
  },
  mercury: {
    ref: React.createRef<HTMLDivElement>(),
    display: 'Mercury',
    radius: 2440,
    distance: 57900000,
    orbitalPeriod: 88,
  },
  venus: {
    ref: React.createRef<HTMLDivElement>(),
    display: 'Venus',
    radius: 6052,
    distance: 108200000,
    orbitalPeriod: 224.7,
  },
  earth: {
    ref: React.createRef<HTMLDivElement>(),
    display: 'Earth',
    radius: 6378,
    distance: 149600000,
    orbitalPeriod: 365.2,
    satellites: [{ display: 'Moon', distance: 384400, orbitalPeriod: 27.3, radius: 1737 }],
  },
  mars: {
    ref: React.createRef<HTMLDivElement>(),
    display: 'Mars',
    radius: 3396,
    distance: 227900000,
    orbitalPeriod: 687,
  },
  theBelt: {
    ref: React.createRef<HTMLDivElement>(),
    display: 'The Belt',
  },
  jupiter: {
    ref: React.createRef<HTMLDivElement>(),
    display: 'Jupiter',
    radius: 71498,
    distance: 778600000,
    orbitalPeriod: 4331,
    satellites: [
      {
        display: 'Io',
        distance: 421700,
        orbitalPeriod: 1.77,
        radius: 1822,
      },
      {
        display: 'Europa',
        distance: 670900,
        orbitalPeriod: 3.55,
        radius: 1561,
      },
      {
        display: 'Ganymede',
        distance: 1070400,
        orbitalPeriod: 7.15,
        radius: 2634,
      },
      {
        display: 'Callisto',
        distance: 1882700,
        orbitalPeriod: 16.69,
        radius: 2410,
      },
    ],
  },
  saturn: {
    ref: React.createRef<HTMLDivElement>(),
    display: 'Saturn',
    radius: 80000 + 58232,
    distance: 1433500000,
    orbitalPeriod: 10747,
    satellites: [
      {
        display: 'Titan',
        distance: 1221870,
        orbitalPeriod: 15.95,
        radius: 2574,
      },
      {
        display: 'Rhea',
        distance: 527108,
        orbitalPeriod: 1.77,
        radius: 764,
      },
    ],
  },
  uranus: {
    ref: React.createRef<HTMLDivElement>(),
    display: 'Uranus',
    radius: 25559,
    distance: 2872500000,
    orbitalPeriod: 30589,
  },
  neptune: {
    ref: React.createRef<HTMLDivElement>(),
    display: 'Neptune',
    radius: 24764,
    distance: 4495100000,
    orbitalPeriod: 59800,
  },
  pluto: {
    ref: React.createRef<HTMLDivElement>(),
    display: 'Pluto',
    radius: 1185,
    distance: 5906400000,
    orbitalPeriod: 90560,
  },
} as const;

export type PointsOfInterestMap = typeof pointsOfInterest;

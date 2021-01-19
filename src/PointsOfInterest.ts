import React from 'react';

/**
 * All the points of interest in the solar system that get rendered.
 * Values are obtained from either https://nssdc.gsfc.nasa.gov/planetary/factsheet/ or wikipedia.
 *
 * The following properties may or may not exist on each point of interest,
 * - testId: string - A unique string used for data-testid identifiers for tests.
 * - ref: RefObject<HTMLDivElement> - A ref so that we can scroll to the object when it is selected in the nav menu.
 * - display: string - The name of the point.
 * - radius: number - The radius of the point of interest (includes rings if visible), units are km.
 * - distance: number - The points distance from the sun, units are km.
 * - orbitalPeriod: number - How many days it takes the point to orbit the sun.
 * - Satellites: PointOfInterest[] - An array of satellites that orbit the point. These have radius, distance,
 *  orbitalPeriod just like the points.
 */
export const pointsOfInterest = {
  sun: {
    testId: 'sun',
    ref: React.createRef<HTMLDivElement>(),
    display: 'Sun',
    radius: 695508,
    distance: 0,
    orbitalPeriod: 1,
  },
  mercury: {
    testId: 'mercury',
    ref: React.createRef<HTMLDivElement>(),
    display: 'Mercury',
    radius: 2440,
    distance: 57900000,
    orbitalPeriod: 88,
  },
  venus: {
    testId: 'venus',
    ref: React.createRef<HTMLDivElement>(),
    display: 'Venus',
    radius: 6052,
    distance: 108200000,
    orbitalPeriod: 224.7,
  },
  earth: {
    testId: 'earth',
    ref: React.createRef<HTMLDivElement>(),
    display: 'Earth',
    radius: 6378,
    distance: 149600000,
    orbitalPeriod: 365.2,
    satellites: [
      {
        testId: 'moon',
        distance: 384400,
        orbitalPeriod: 27.3,
        radius: 1737,
      },
    ],
  },
  mars: {
    testId: 'mars',
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
    testId: 'jupiter',
    ref: React.createRef<HTMLDivElement>(),
    display: 'Jupiter',
    radius: 71498,
    distance: 778600000,
    orbitalPeriod: 4331,
    satellites: [
      {
        testId: 'io',
        distance: 421700,
        orbitalPeriod: 1.77,
        radius: 1822,
      },
      {
        testId: 'europa',
        distance: 670900,
        orbitalPeriod: 3.55,
        radius: 1561,
      },
      {
        testId: 'ganymede',
        distance: 1070400,
        orbitalPeriod: 7.15,
        radius: 2634,
      },
      {
        testId: 'callisto',
        distance: 1882700,
        orbitalPeriod: 16.69,
        radius: 2410,
      },
    ],
  },
  saturn: {
    testId: 'saturn',
    ref: React.createRef<HTMLDivElement>(),
    display: 'Saturn',
    radius: 80000 + 58232, // making the ring radius clear
    distance: 1433500000,
    orbitalPeriod: 10747,
    satellites: [
      {
        testId: 'titan',
        distance: 1221870,
        orbitalPeriod: 15.95,
        radius: 2574,
      },
      {
        testId: 'rhea',
        distance: 527108,
        orbitalPeriod: 1.77,
        radius: 764,
      },
    ],
  },
  uranus: {
    testId: 'uranus',
    ref: React.createRef<HTMLDivElement>(),
    display: 'Uranus',
    radius: 25559,
    distance: 2872500000,
    orbitalPeriod: 30589,
  },
  neptune: {
    testId: 'neptune',
    ref: React.createRef<HTMLDivElement>(),
    display: 'Neptune',
    radius: 24764,
    distance: 4495100000,
    orbitalPeriod: 59800,
  },
  pluto: {
    testId: 'pluto',
    ref: React.createRef<HTMLDivElement>(),
    display: 'Pluto',
    radius: 1185,
    distance: 5906400000,
    orbitalPeriod: 90560,
  },
} as const;

import React, { RefObject, useState, FC, useEffect } from 'react';
import clsx from 'clsx';

import TheSystem from './components/the-system/TheSystem';
import AppContext, { SystemContext, systemSize } from './SystemContext';
import styles from './App.module.scss';
import NavMenu from './components/nav-menu/NavMenu';
import { doCallbackAfterElementIsVisible, scrollOptions, scrollToElementIfNotVisible } from './utils/DomUtil';

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

const pointsOfInterest: PointsOfInterestMap = {
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

interface FollowerState {
  /** The point of interest being followed. */
  pointOfInterest?: PointOfInterest;
  /**
   * The interval at which the point of interest is being checked to see whether it is visible on screen.
   * This can be cleared when the point of interest is no longer being followed.
   */
  interval?: NodeJS.Timeout;
}

const App: FC = () => {
  const [systemSizeContext, setSystemSizeContext] = useState(systemSize.enhancedVisibility);
  const [orbitsVisible, setOrbitsVisible] = useState(false);
  const [follower, setFollower] = useState<FollowerState>({});

  const clearFollower = () => {
    if (follower.interval) {
      clearInterval(follower.interval);
    }
    setFollower({});
  };

  // Make sure we cleanup the follower timeout when the component unmounts.
  useEffect(() => {
    return clearFollower;
  });

  const onChangeSystemSizeWithClear = (newSystemSizeContext: SystemContext): void => {
    clearFollower();
    setSystemSizeContext(newSystemSizeContext);
  };

  /**
   * Function for following points of interest around the solar system.
   *
   * If something is already being followed, calling this will stop following.
   * If the sun or the belt is selected it will just scroll them into view.
   * If anything else is selected it will set an interval to scroll the element into view if it isn't already
   * */
  const poiOnClick = (poi: PointOfInterest): void => {
    if (poi === follower.pointOfInterest) {
      clearFollower();
    } else if (poi === pointsOfInterest.sun || poi === pointsOfInterest.theBelt) {
      clearFollower();
      poi.ref.current?.scrollIntoView(scrollOptions);
    } else if (poi.ref.current) {
      clearFollower();
      poi.ref.current.scrollIntoView(scrollOptions);
      doCallbackAfterElementIsVisible(poi.ref.current, () => {
        const interval = setInterval(() => scrollToElementIfNotVisible(poi.ref.current), 1000);
        setFollower({ pointOfInterest: poi, interval });
      });
    }
  };

  return (
    <AppContext.Provider value={systemSizeContext}>
      <div className={clsx({ [styles.orbitsVisible]: orbitsVisible })}>
        <div className={styles.title}>
          <span>The System</span>
        </div>
        <NavMenu
          orbitsVisible={orbitsVisible}
          pointsOfInterestMap={pointsOfInterest}
          followedPointOfInterest={follower.pointOfInterest}
          onChangeSystemSize={onChangeSystemSizeWithClear}
          onOrbitsVisibleChange={setOrbitsVisible}
          onFollowPointOfInterest={poiOnClick}
        />
        <TheSystem pointsOfInterest={pointsOfInterest} />
      </div>
    </AppContext.Provider>
  );
};

export default App;

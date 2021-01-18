import React, { useState, FC, useEffect, useCallback, RefObject } from 'react';
import clsx from 'clsx';

import TheSystem from './components/the-system/TheSystem';
import AppContext, { SystemContext, systemSize } from './SystemContext';
import styles from './App.module.scss';
import NavMenu from './components/nav-menu/NavMenu';
import { doCallbackAfterElementIsVisible, scrollOptions, scrollToElementIfNotVisible } from './utils/DomUtil';
import { pointsOfInterest } from './PointsOfInterest';

interface FollowerState {
  /** The point of interest being followed. */
  pointOfInterest?: { ref: RefObject<HTMLDivElement> };
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

  const clearFollower = useCallback(() => {
    if (follower.interval) {
      clearInterval(follower.interval);
    }
    setFollower({});
  }, [follower, setFollower]);

  // Make sure we cleanup the follower timeout when the component unmounts.
  useEffect(() => {
    return () => follower.interval && clearInterval(follower.interval);
  }, [follower.interval]);

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
  const poiOnClick = useCallback(
    (pointOfInterest: { ref: RefObject<HTMLDivElement> }): void => {
      if (pointOfInterest === follower.pointOfInterest) {
        clearFollower();
      } else if (pointOfInterest === pointsOfInterest.sun || pointOfInterest === pointsOfInterest.theBelt) {
        clearFollower();
        pointOfInterest.ref.current?.scrollIntoView(scrollOptions);
      } else if (pointOfInterest.ref.current) {
        clearFollower();
        pointOfInterest.ref.current.scrollIntoView(scrollOptions);
        doCallbackAfterElementIsVisible(pointOfInterest.ref.current, () => {
          const interval = setInterval(() => scrollToElementIfNotVisible(pointOfInterest.ref.current), 1000);
          setFollower({ pointOfInterest, interval });
        });
      }
    },
    [clearFollower, follower]
  );

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

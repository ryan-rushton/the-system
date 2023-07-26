import * as Sentry from '@sentry/react';
import clsx from 'clsx';
import React, { FC, RefObject, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './App.module.scss';
import { pointsOfInterest } from './PointsOfInterest';
import NavMenu from './components/nav-menu/NavMenu';
import NotificationView from './components/notifications/NotificationsList';
import { showNotification } from './components/notifications/notifications';
import TheSystem from './components/the-system/TheSystem';
import AppContext, { SystemContext, systemSize } from './context/SystemContext';
import { doCallbackAfterElementIsVisible, scrollOptions, scrollToElementIfNotVisible } from './utils/DomUtil';

type PointOfInterestIds =
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

interface FollowerState {
  /** The point of interest being followed. */
  pointOfInterest?: { ref: RefObject<HTMLDivElement>; id: PointOfInterestIds };
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
  const { t } = useTranslation();

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

  const createIntervalAndSetFollower = useCallback(
    (pointOfInterest: { ref: RefObject<HTMLDivElement>; id: PointOfInterestIds }) => {
      const interval = setInterval(() => scrollToElementIfNotVisible(pointOfInterest.ref.current), 1000);
      setFollower({ pointOfInterest, interval });
      showNotification({
        severity: 'info',
        message: t('notifications.followingPoint', { point: t(`pointsOfInterest.${pointOfInterest.id}`).toString() }),
        origin: 'follower',
        duration: 5,
      });
    },
    [setFollower, t],
  );

  /**
   * Function for following points of interest around the solar system.
   *
   * If something is already being followed, calling this will stop following.
   * If the sun or the belt is selected it will just scroll them into view.
   * If anything else is selected it will set an interval to scroll the element into view if it isn't already.
   * */
  const poiOnClick = useCallback(
    (pointOfInterest: { ref: RefObject<HTMLDivElement>; id: PointOfInterestIds }): void => {
      if (pointOfInterest === follower.pointOfInterest) {
        // clear if already followed
        clearFollower();
      } else if (pointOfInterest === pointsOfInterest.sun || pointOfInterest === pointsOfInterest.theBelt) {
        // scroll to without follow for sun and the belt
        clearFollower();
        pointOfInterest.ref.current?.scrollIntoView(scrollOptions);
      } else if (pointOfInterest.ref.current) {
        // scroll and set follower for most object
        clearFollower();
        pointOfInterest.ref.current.scrollIntoView(scrollOptions);
        doCallbackAfterElementIsVisible(pointOfInterest.ref.current, () =>
          createIntervalAndSetFollower(pointOfInterest),
        );
      }
    },
    [createIntervalAndSetFollower, clearFollower, follower],
  );

  return (
    <AppContext.Provider value={systemSizeContext}>
      <div className={clsx({ [styles.orbitsVisible]: orbitsVisible })}>
        <div className={styles.title}>
          <span>{t('theSystem')}</span>
        </div>
        {/* Wrap the nav menu in a sentry error boundary so users can still scroll around manually. */}
        <Sentry.ErrorBoundary
          showDialog={true}
          beforeCapture={(scope) => {
            scope.setTag('location', 'nav-menu');
          }}
        >
          <NavMenu
            followedPointOfInterest={follower.pointOfInterest}
            onChangeSystemSize={onChangeSystemSizeWithClear}
            onFollowPointOfInterest={poiOnClick}
            onOrbitsVisibleChange={setOrbitsVisible}
            orbitsVisible={orbitsVisible}
          />
        </Sentry.ErrorBoundary>
        <TheSystem />
      </div>
      <NotificationView />
    </AppContext.Provider>
  );
};

export default App;

import React, { FC, memo, useEffect, useState } from 'react';

import { PointOfInterest, PointsOfInterest } from '../../App';
import { SystemContext } from '../../SystemContext';
import { doCallbackAfterElementIsVisible, scrollOptions, scrollToElementIfNotVisible } from '../../utils/DomUtil';
import InfoMenu from './sub-menus/InfoMenu';
import NavMenu from './nav-menu/NavMenu';
import PointOfInterestButton from './sub-menus/PointOfInterestButton';

interface Props {
  /** Whether the red orbit lines are visible. */
  orbitsVisible: boolean;
  /** The collection of points of interest. */
  pointsOfInterest: PointsOfInterest;
  /** Change handler for whether the red orbit lines are visible. */
  onOrbitsVisibleChange(orbitsVisible: boolean): void;
  /** Change handler for normalising km per pixel. */
  onChangeSystemSize(systemSizeContext: SystemContext): void;
}

interface FollowerState {
  /** The point of interest being followed. */
  pointOfInterest?: PointOfInterest;
  /**
   * The interval at which the point of interest is being checked to see whether it is visible on screen.
   * This can be cleared when the point of interest is no longer being followed.
   */
  interval?: NodeJS.Timeout;
}

/**
 * A nav menu for the app. It contains the buttons to scroll to different points of interest around the solar system
 * as well as some informational content and buttons to change how orbits and km per pixel are displayed.
 *
 * Note that handlers are not memoised using useCallback as this should only re-render on context change at which
 * point everything re-renders. This would break the foll
 */
const SystemNavMenu: FC<Props> = ({ orbitsVisible, pointsOfInterest, onOrbitsVisibleChange, onChangeSystemSize }) => {
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

  const onChangeSystemSizeWithClear = (systemSizeContext: SystemContext): void => {
    clearFollower();
    return onChangeSystemSize(systemSizeContext);
  };

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
    <NavMenu
      elements={[
        {
          title: 'Info',
          content: (
            <InfoMenu
              orbitsVisible={orbitsVisible}
              onChangeSystemSize={onChangeSystemSizeWithClear}
              onOrbitsVisibleChange={onOrbitsVisibleChange}
            />
          ),
        },
        {
          title: 'Navigation',
          content: (
            <>
              {Object.values(pointsOfInterest).map((poi) => (
                <PointOfInterestButton
                  key={poi.display}
                  pointOfInterest={poi}
                  isBeingFollowed={poi === follower.pointOfInterest}
                  onPoiClick={() => poiOnClick(poi)}
                />
              ))}
            </>
          ),
        },
      ]}
    />
  );
};

export default memo(SystemNavMenu);

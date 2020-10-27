import React, { FC, useState } from "react";
import { PointOfInterest, PointsOfInterest } from "../../App";
import { SystemContext } from "../../SystemContext";
import { doCallbackAfterElementIsVisible, scrollOptions, scrollToElementIfNotVisible } from "../../utils/DomUtil";
import InfoMenu from "./sub-menus/InfoMenu";
import NavMenu from "./nav-menu/NavMenu";
import PointsOfInterestMenu from "./sub-menus/PointsOfInterestMenu";

interface Props {
  orbitsVisible: boolean;
  pointsOfInterest: PointsOfInterest;
  onOrbitsVisibleChange(orbitsVisible: boolean): void;
  onChangeSystemSize(systemSizeContext: SystemContext): void;
}

interface FollowerState {
  pointOfInterest?: PointOfInterest;
  interval?: NodeJS.Timeout;
}

const SystemNavMenu: FC<Props> = ({ orbitsVisible, pointsOfInterest, onOrbitsVisibleChange, onChangeSystemSize }) => {
  const [follower, setFollower] = useState<FollowerState>({});

  const clearFollower = () => {
    if (follower.interval) {
      clearInterval(follower.interval);
    }
    setFollower({});
  };

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
      poi.ref.current.scrollIntoView(scrollOptions);
      doCallbackAfterElementIsVisible(poi.ref.current, () => {
        const interval = setInterval(() => scrollToElementIfNotVisible(poi.ref.current), 1000);
        setFollower({ pointOfInterest: poi, interval });
      });
    }
  };

  return (
    <NavMenu titles={["Info", "Navigation"]}>
      <InfoMenu
        orbitsVisible={orbitsVisible}
        onChangeSystemSize={onChangeSystemSizeWithClear}
        onOrbitsVisibleChange={onOrbitsVisibleChange}
      />
      <PointsOfInterestMenu
        pointsOfInterest={pointsOfInterest}
        onPoiClick={poiOnClick}
        followedPoi={follower.pointOfInterest}
      />
    </NavMenu>
  );
};

export default SystemNavMenu;

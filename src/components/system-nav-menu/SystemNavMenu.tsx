import React, { ReactNode } from "react";
import { PointOfInterest, PointsOfInterest } from "../../App";
import AppContext, { SystemContext } from "../../SystemContext";
import {
    doCallbackAfterElementIsVisible,
    scrollOptions,
    scrollToElementIfNotVisible
} from "../../utils/DomUtil";
import InfoMenu from "./sub-menus/InfoMenu";
import NavMenu from "./nav-menu/NavMenu";
import PointsOfInterestMenu from "./sub-menus/PointsOfInterestMenu";

interface Props {
    orbitsVisible: boolean;
    pointsOfInterest: PointsOfInterest;
    onOrbitsVisibleChange(orbitsVisible: boolean): void;
    onChangeSystemSize(systemSizeContext: SystemContext): void;
}

interface State {
    followedPoi: PointOfInterest | null;
}

class SystemNavMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            followedPoi: null
        };

        this.follower = null;
    }

    follower: NodeJS.Timeout | null;

    componentWillUnmount(): void {
        this.clearFollower();
    }

    clearFollower = (): void => {
        if (this.follower) {
            clearInterval(this.follower);
            this.follower = null;
        }
    };

    onChangeSystemSizeWithClear = (systemSizeContext: SystemContext): void => {
        const { onChangeSystemSize } = this.props;
        this.setState({ followedPoi: null });
        this.clearFollower();
        return onChangeSystemSize(systemSizeContext);
    };

    setFollower(poi: PointOfInterest): void {
        this.follower = setInterval(() => scrollToElementIfNotVisible(poi.ref.current), 1000);
    }

    gotoPoiAndFollow(poi: PointOfInterest): void {
        if (poi.ref.current) {
            poi.ref.current.scrollIntoView(scrollOptions);
            doCallbackAfterElementIsVisible(poi.ref.current, () => this.setFollower(poi));
        }
    }

    poiOnClick = (poi: PointOfInterest): void => {
        const { followedPoi } = this.state;
        const { pointsOfInterest } = this.props;

        this.follower && clearInterval(this.follower);

        if (poi === followedPoi) {
            this.setState({ followedPoi: null });
        } else if (poi === pointsOfInterest.sun || poi === pointsOfInterest.theBelt) {
            this.setState({ followedPoi: null });
            poi.ref.current?.scrollIntoView(scrollOptions);
        } else {
            this.gotoPoiAndFollow(poi);
            this.setState({ followedPoi: poi });
        }
    };

    render(): ReactNode {
        const { orbitsVisible, pointsOfInterest, onOrbitsVisibleChange } = this.props;
        const { followedPoi } = this.state;

        return (
            <NavMenu titles={["Info", "Navigation"]}>
                <InfoMenu
                    orbitsVisible={orbitsVisible}
                    onChangeSystemSize={this.onChangeSystemSizeWithClear}
                    onOrbitsVisibleChange={onOrbitsVisibleChange}
                />
                <PointsOfInterestMenu
                    pointsOfInterest={pointsOfInterest}
                    onPoiClick={this.poiOnClick}
                    followedPoi={followedPoi}
                />
            </NavMenu>
        );
    }
}

SystemNavMenu.contextType = AppContext;

export default React.memo(SystemNavMenu);

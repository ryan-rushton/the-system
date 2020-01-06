import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties, ReactNode, RefObject } from "react";
import { PointOfInterest, PointsOfInterest } from "../../App";
import AppContext, { systemSize, SystemContext } from "../../SystemContext";
import {
    doCallbackAfterElementIsVisible,
    getDistanceToTop,
    scrollToElementIfNotVisible,
    scrollOptions
} from "../../utils/DomUtil";
import { getOnEnterPress } from "../../utils/EventUtils";
import "./NavMenu.scss";
import NavMenuSubsection from "./NavMenuSubsection";
import { CallbackFunction } from "../../types";

interface Props {
    orbitsVisible: boolean;
    pointsOfInterest: PointsOfInterest;
    onOrbitsVisibleChange(orbitsVisible: boolean): void;
    toggleSystemSize(systemSizeContext: SystemContext): void;
}

interface State {
    dropdownVisible: boolean;
    followedPoi: PointOfInterest | null;
    infoVisible: boolean;
    gotoVisible: boolean;
}

class NavMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dropdownVisible: false,
            followedPoi: null,
            infoVisible: false,
            gotoVisible: false
        };

        this.dropDownRef = React.createRef();
        this.infoRef = React.createRef();
        this.gotoRef = React.createRef();
        this.follower = null;
    }

    dropDownRef: RefObject<HTMLDivElement>;
    infoRef: RefObject<HTMLDivElement>;
    gotoRef: RefObject<HTMLDivElement>;
    follower: NodeJS.Timeout | null;

    componentWillUnmount(): void {
        this.follower && clearInterval(this.follower);
    }

    onInfoClick: () => void = () => {
        this.setState(
            (prevState: State): State => ({
                ...prevState,
                infoVisible: !prevState.infoVisible,
                gotoVisible: false
            })
        );
    };

    onGotoClick: () => void = () => {
        this.setState(
            (prevState: State): State => ({
                ...prevState,
                infoVisible: false,
                gotoVisible: !prevState.gotoVisible
            })
        );
    };

    onMenuClick: () => void = () => {
        this.setState(
            (prevState: State): State => ({
                ...prevState,
                dropdownVisible: !prevState.dropdownVisible
            })
        );
    };

    getOnSizeChangeClick: () => () => void = () => {
        const { toggleSystemSize } = this.props;
        const { enhancedVisibility, evenSpace } = systemSize;
        const systemSizeContext = evenSpace === this.context ? enhancedVisibility : evenSpace;
        return (): void => {
            this.follower && clearInterval(this.follower);
            toggleSystemSize(systemSizeContext);
        };
    };

    getOnOrbitChangeClick(): () => void {
        const { orbitsVisible, onOrbitsVisibleChange } = this.props;

        return (): void => onOrbitsVisibleChange(!orbitsVisible);
    }

    setFollower(poi: PointOfInterest): void {
        this.follower = setInterval(() => scrollToElementIfNotVisible(poi.ref.current), 1000);
    }

    gotoPoiAndFollow(poi: PointOfInterest): void {
        if (poi.ref.current) {
            poi.ref.current.scrollIntoView(scrollOptions);
            doCallbackAfterElementIsVisible(poi.ref.current, () => this.setFollower(poi));
        }
    }

    getPoiOnClick(poi: PointOfInterest): CallbackFunction {
        const { followedPoi } = this.state;
        const { pointsOfInterest } = this.props;

        return (): void => {
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
    }

    getTransformStyle(): CSSProperties | undefined {
        const { dropdownVisible } = this.state;
        const { current } = this.dropDownRef;

        if (current) {
            const maxHeight = `calc(100vh - ${getDistanceToTop(current)}px)`;
            const visibleTransform = `translateX(calc(-8vw - ${current.offsetWidth}px))`;
            return {
                maxHeight,
                transform: dropdownVisible ? visibleTransform : "translateX(0px)"
            };
        }
    }

    renderPointsOfInterest(): ReactNode {
        const { pointsOfInterest } = this.props;
        const { followedPoi } = this.state;
        return Object.values(pointsOfInterest).map((poi: PointOfInterest) => {
            const followedClass = followedPoi === poi ? " the-system-nav-goto-item-followed" : "";
            const title = followedPoi === poi ? "Click again to stop following" : undefined;
            return (
                <div key={poi.display}>
                    <div
                        className={`the-system-nav-button the-system-nav-goto-item${followedClass}`}
                        onClick={this.getPoiOnClick(poi)}
                        onKeyPress={getOnEnterPress(this.getPoiOnClick(poi))}
                        role="button"
                        tabIndex={0}
                        title={title}
                    >
                        {poi.display}
                    </div>
                </div>
            );
        });
    }

    renderInformation(): ReactNode {
        const { orbitsVisible } = this.props;
        const { multipliers } = this.context;
        const {
            orbitalPeriodMultiplier,
            distanceMultiplier,
            sizeMultiplier,
            satelliteDist
        } = multipliers;

        const daysPerSecond = 1 * orbitalPeriodMultiplier;
        const kmPerPixelDistance = Math.round(1 / distanceMultiplier).toLocaleString();
        const kmPerPixelSatellite = Math.round(1 / satelliteDist).toLocaleString();
        const kmPerPixelSize = Math.round(1 / sizeMultiplier).toLocaleString();
        const normaliseButtonStatus =
            systemSize.evenSpace === this.context ? " the-system-nav-info-button-active" : "";
        const orbitButtonStatus = orbitsVisible ? " the-system-nav-info-button-active" : "";

        return (
            <>
                <div className="the-system-nav-info-body-heading">Time</div>
                <div className="the-system-nav-info-body-stat">{`${daysPerSecond} s = 1 day`}</div>
                <div className="the-system-nav-info-body-heading">Distance Between Planets</div>
                <div className="the-system-nav-info-body-stat">{`1 pixel = ${kmPerPixelDistance} km`}</div>
                <div className="the-system-nav-info-body-heading">
                    Distance Between Planets And Moons
                </div>
                <div className="the-system-nav-info-body-stat">{`1 pixel = ${kmPerPixelSatellite} km`}</div>
                <div className="the-system-nav-info-body-heading">Planet Size</div>
                <div className="the-system-nav-info-body-stat">{`1 pixel = ${kmPerPixelSize} km`}</div>
                <div className="the-system-nav-info-button-wrapper">
                    <div
                        className={`the-system-nav-info-button${normaliseButtonStatus}`}
                        onClick={this.getOnSizeChangeClick()}
                        onKeyPress={getOnEnterPress(this.getOnSizeChangeClick())}
                        role="button"
                        tabIndex={0}
                    >
                        Normalise Distance
                    </div>
                </div>
                <div className="the-system-nav-info-button-wrapper">
                    <div
                        className={`the-system-nav-info-button${orbitButtonStatus}`}
                        onClick={this.getOnOrbitChangeClick()}
                        onKeyPress={getOnEnterPress(this.getOnOrbitChangeClick())}
                        role="button"
                        tabIndex={0}
                    >
                        Show Orbits
                    </div>
                </div>
            </>
        );
    }

    render(): ReactNode {
        const { infoVisible, gotoVisible } = this.state;
        const style = this.getTransformStyle();

        return (
            <div className="the-system-nav">
                <div className="the-system-nav-header">
                    <div
                        className="the-system-nav-button the-system-nav-header-button"
                        onClick={this.onMenuClick}
                        // onKeyPress={getOnEnterPress(this.onMenuClick)}
                        role="button"
                        tabIndex={0}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <div className="the-system-nav-dropdown" ref={this.dropDownRef} style={style}>
                    <NavMenuSubsection
                        onClick={this.onInfoClick}
                        headerText="Information"
                        bodyRef={this.infoRef}
                        isVisible={infoVisible}
                        content={this.renderInformation()}
                    />
                    <NavMenuSubsection
                        onClick={this.onGotoClick}
                        headerText="Navigation"
                        bodyRef={this.gotoRef}
                        isVisible={gotoVisible}
                        content={this.renderPointsOfInterest()}
                    />
                </div>
            </div>
        );
    }
}

NavMenu.contextType = AppContext;

export default React.memo(NavMenu);

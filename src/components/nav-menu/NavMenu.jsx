import React from "react";
import PropTypes from "prop-types";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./NavMenu.scss";
import SystemContext, { systemSize } from "../../SystemContext";

class NavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownVisible: false,
            infoVisible: false,
            poiVisible: false
        };

        this.dropDownRef = React.createRef();
        this.infoRef = React.createRef();
        this.gotoRef = React.createRef();
    }

    // Event Handlers

    onInfoClick = () => {
        this.setState(prevState => ({ infoVisible: !prevState.infoVisible, poiVisible: false }));
    };

    onGotoClick = () => {
        this.setState(prevState => ({ infoVisible: false, poiVisible: !prevState.poiVisible }));
    };

    onMenuClick = () => {
        this.setState(prevState => ({
            dropdownVisible: !prevState.dropdownVisible
        }));
    };

    getOnSizeChangeClick = () => {
        const { enhancedVisibility, evenSpace } = systemSize;
        const systemSizeContext = evenSpace === this.context ? enhancedVisibility : evenSpace;
        return () => this.props.toggleSystemSize(systemSizeContext);
    };

    // Event Handler Creators

    getOnPoiClick = poi => {
        const scrollOptions = {
            behavior: "smooth",
            block: "center",
            inline: "center"
        };

        return () => poi.ref.current.scrollIntoView(scrollOptions);
    };

    // Methods

    getTransformStyle() {
        const { dropdownVisible } = this.state;
        const { current } = this.dropDownRef;

        if (!current) {
            return null;
        }

        let elem = current;
        let distanceToTop = 0;
        while (elem) {
            distanceToTop += elem.offsetTop;
            elem = elem.offsetParent;
        }

        const maxHeight = `calc(100vh - ${distanceToTop}px)`;

        if (dropdownVisible) {
            return {
                maxHeight,
                transform: `translateX(calc(-8vw - ${current.offsetWidth}px))`
            };
        }

        return {
            maxHeight,
            transform: `translateX(0px)`
        };
    }

    getSlidingStylesForMenus(ref, isVisible) {
        const { current } = ref;
        let actualHeight = 0;

        if (current?.childNodes?.length) {
            for (const child of current.childNodes) {
                actualHeight += child.offsetHeight;
            }
        }

        return {
            maxHeight: isVisible ? actualHeight : 0
        };
    }

    renderPointOfInterest(poi) {
        return (
            <div
                className="the-system-nav-button the-system-nav-goto-item"
                role="button"
                key={poi.display}
                onClick={this.getOnPoiClick(poi)}
                onKeyPress={this.getOnPoiClick(poi)}
                tabIndex="0"
            >
                {poi.display}
            </div>
        );
    }

    renderInformation() {
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
            systemSize.evenSpace === this.context ? " the-system-nav-info-normalise-active" : "";

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
                <div
                    className={`the-system-nav-info-normalise${normaliseButtonStatus}`}
                    onClick={this.getOnSizeChangeClick()}
                    onKeyPress={this.getOnSizeChangeClick()}
                    role="button"
                    tabIndex="0"
                >
                    Normalise Distance
                </div>
            </>
        );
    }

    renderPointsOfInterest() {
        const { pointsOfInterest } = this.props;

        return Object.values(pointsOfInterest).map(poi => this.renderPointOfInterest(poi));
    }

    render() {
        const { infoVisible, poiVisible } = this.state;
        const style = this.getTransformStyle();

        return (
            <div className="the-system-nav">
                <div className="the-system-nav-header">
                    <div
                        className="the-system-nav-button the-system-nav-header-button"
                        onClick={this.onMenuClick}
                        onKeyPress={this.onMenuClick}
                        role="button"
                        tabIndex="0"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <div className="the-system-nav-dropdown" ref={this.dropDownRef} style={style}>
                    <div
                        className="the-system-nav-button the-system-nav-dropdown-item-subheader"
                        onClick={this.onInfoClick}
                        onKeyPress={this.onInfoClick}
                        role="button"
                        tabIndex="0"
                    >
                        Information
                    </div>
                    <div
                        className="the-system-nav-dropdown-item-body"
                        ref={this.infoRef}
                        style={this.getSlidingStylesForMenus(this.infoRef, infoVisible)}
                    >
                        {this.renderInformation()}
                    </div>
                    <div
                        className="the-system-nav-button the-system-nav-dropdown-item-subheader"
                        onClick={this.onGotoClick}
                        onKeyPress={this.onGotoClick}
                        role="button"
                        tabIndex="0"
                    >
                        Navigation
                    </div>
                    <div
                        className="the-system-nav-dropdown-item-body"
                        ref={this.gotoRef}
                        style={this.getSlidingStylesForMenus(this.gotoRef, poiVisible)}
                    >
                        {this.renderPointsOfInterest()}
                    </div>
                </div>
            </div>
        );
    }
}

NavMenu.propTypes = {
    pointsOfInterest: PropTypes.shape({}).isRequired,
    toggleSystemSize: PropTypes.func.isRequired
};

NavMenu.contextType = SystemContext;

export default NavMenu;

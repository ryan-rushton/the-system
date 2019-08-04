import React from "react";
import PropTypes from "prop-types";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./NavMenu.scss";

class NavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownVisible: false
        };

        this.onDropdownClick = this.onDropdownClick.bind(this);
        this.dropDown = React.createRef();
    }

    onDropdownClick() {
        this.setState(prevState => ({
            dropdownVisible: !prevState.dropdownVisible
        }));
    }

    getTransformStyle() {
        const { dropdownVisible } = this.state;
        const dropdownRef = this.dropDown.current;

        if (!dropdownRef) {
            return null;
        }

        if (dropdownVisible) {
            return {
                transform: `translateX(calc(-8vw - ${dropdownRef.offsetWidth}px))`
            };
        }

        return {
            transform: `translateX(0px)`
        };
    }

    renderPointOfInterest(poi) {
        const scrollOptions = {
            behavior: "smooth",
            block: "center",
            inline: "center"
        };
        const onSelect = () => poi.ref.current.scrollIntoView(scrollOptions);

        return (
            <div
                className="the-system-nav-dropdown-goto-item"
                role="button"
                key={poi.display}
                onClick={onSelect}
                onKeyPress={onSelect}
                tabIndex="0"
            >
                {poi.display}
            </div>
        );
    }

    renderPointsOfInterest() {
        const { pointsOfInterest } = this.props;

        return Object.entries(pointsOfInterest).map(poi => this.renderPointOfInterest(poi[1]));
    }

    render() {
        const style = this.getTransformStyle();
        return (
            <div className="the-system-nav">
                <div className="the-system-nav-header">
                    <div
                        className="the-system-nav-header-button"
                        onClick={this.onDropdownClick}
                        onKeyPress={this.onDropdownClick}
                        role="button"
                        tabIndex="0"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <div className="the-system-nav-dropdown" ref={this.dropDown} style={style}>
                    <div className="the-system-nav-dropdown-goto-header">Go to</div>
                    {this.renderPointsOfInterest()}
                </div>
            </div>
        );
    }
}

NavMenu.propTypes = {
    pointsOfInterest: PropTypes.shape({}).isRequired
};

export default NavMenu;

import React from "react";
import PropTypes from "prop-types";
import "./CelestialBody.css";

const UPDATE_INTERVAL = 200; // this is in ms
const MS_PER_MIN = 60000;

class CelestialBody extends React.Component {
    getCssValuesForOrbit() {
        const { radius, systemRadius, radiansPerMinute, distance } = this.props;
        const center = systemRadius - distance - radius;
        return {
            animation: `orbit ${radiansPerMinute}s linear infinite`,
            borderRadois: "50%",
            height: `calc(2*(${distance}px + ${radius}px))`,
            left: `calc(${center}px)`,
            position: "absolute",
            top: `calc(${center}px)`,
            width: `calc(2*(${distance}px + ${radius}px))`
        };
    }

    getCssValuesForPlanet() {
        const { radius, distance } = this.props;
        const top = distance > 0 ? "50%" : 0;
        return {
            height: `${radius * 2}px`,
            left: 0,
            position: "relative",
            top,
            width: `${radius * 2}px`
        };
    }

    updateTheta(theta) {
        if (!document.hidden) {
            const { radiansPerMinute } = this.props;
            const extraRadians =
                radiansPerMinute * (UPDATE_INTERVAL / MS_PER_MIN);
            const newTheta = theta + extraRadians;
            return newTheta % (2 * Math.PI);
        }

        return theta;
    }

    render() {
        const { additionalClassNames } = this.props;
        const className = additionalClassNames.join(" ");

        return (
            <div
                className={`planet-orbit ${className}-orbit`}
                style={this.getCssValuesForOrbit()}
            >
                <div
                    className={`celestial-body ${className}`}
                    style={this.getCssValuesForPlanet()}
                />
            </div>
        );
    }
}

CelestialBody.propTypes = {
    additionalClassNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    distance: PropTypes.number.isRequired,
    radiansPerMinute: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default CelestialBody;

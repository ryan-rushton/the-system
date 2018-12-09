import React from "react";
import PropTypes from "prop-types";
import "./CelestialBody.css";

const UPDATE_INTERVAL = 200; // this is in ms
const MS_PER_MIN = 60000;

class CelestialBody extends React.Component {
    getCssValuesForOrbitAbsolute() {
        const { radius, systemRadius, radiansPerMinute, distance } = this.props;
        const center = systemRadius - distance - radius;
        const heightWidth = 2 * (distance + radius);

        return {
            animation: `orbit ${radiansPerMinute}s linear infinite`,
            borderRadius: "50%",
            height: `${heightWidth}px`,
            left: `${center}px`,
            position: "absolute",
            top: `${center}px`,
            width: `${heightWidth}px`
        };
    }

    getCssValuesForOrbitRelative() {
        const { radius, radiansPerMinute, distance, systemRadius } = this.props;
        const heightWidth = 2 * (distance + radius + systemRadius);
        const offset = -distance - radius;

        return {
            animation: `orbit ${radiansPerMinute}s linear infinite`,
            borderRadius: "50%",
            height: `${heightWidth}px`,
            left: `${offset}px`,
            position: "relative",
            top: `${offset}px`,
            width: `${heightWidth}px`
        };
    }

    getCssValuesForBody() {
        const { radius, distance } = this.props;
        const top = distance > 0 ? "50%" : 0;

        return {
            borderRadius: "50%",
            height: `${radius * 2}px`,
            left: 0,
            minHeight: "1px",
            minWidth: "1px",
            position: "relative",
            top,
            width: `${radius * 2}px`
        };
    }

    updateTheta(theta) {
        if (!document.hidden) {
            const { radiansPerMinute } = this.props;
            const extraRadians = radiansPerMinute * (UPDATE_INTERVAL / MS_PER_MIN);
            const newTheta = theta + extraRadians;
            return newTheta % (2 * Math.PI);
        }

        return theta;
    }

    renderSatellites() {
        const { satellites } = this.props;
        return satellites.map(satellite => (
            <CelestialBody key={`satellite-${satellite.className}`} orbitRelative {...satellite} />
        ));
    }

    render() {
        const { className, orbitRelative } = this.props;
        const styles =
            orbitRelative === true
                ? this.getCssValuesForOrbitRelative()
                : this.getCssValuesForOrbitAbsolute();

        return (
            <div className={`planet-orbit ${className}-orbit`} style={styles}>
                <div className={`celestial-body ${className}`} style={this.getCssValuesForBody()}>
                    {this.renderSatellites()}
                </div>
            </div>
        );
    }
}

CelestialBody.propTypes = {
    className: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    satellites: PropTypes.arrayOf(PropTypes.shape({})),
    orbitRelative: PropTypes.bool,
    radiansPerMinute: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    systemRadius: PropTypes.number.isRequired
};

CelestialBody.defaultProps = {
    satellites: [],
    orbitRelative: false
};

export default CelestialBody;

import React from "react";
import PropTypes from "prop-types";
import SystemContext from "../../SystemContext";
import "./CelestialBody.scss";

class CelestialBody extends React.Component {
    getCssValuesForOrbitAbsolute() {
        const { systemRadius } = this.context;
        const { radius, radiansPerMinute, distance } = this.props;
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
        const { radius, radiansPerMinute, distance, planetRadius } = this.props;
        const heightWidth = 2 * (distance + radius + planetRadius);
        const offset = -distance - radius;

        return {
            animation: `orbit ${radiansPerMinute}s linear infinite`,
            borderRadius: "50%",
            height: `${heightWidth}px`,
            left: `${offset}px`,
            position: "absolute",
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
            minHeight: "3px",
            minWidth: "3px",
            position: "relative",
            top,
            width: `${radius * 2}px`
        };
    }

    renderSatellites() {
        const { satellites } = this.props;
        return satellites.map(satellite => (
            <CelestialBody key={`satellite-${satellite.className}`} orbitRelative {...satellite} />
        ));
    }

    render() {
        const { className, orbitRelative, scrollToRef } = this.props;
        const styles =
            orbitRelative === true
                ? this.getCssValuesForOrbitRelative()
                : this.getCssValuesForOrbitAbsolute();

        return (
            <div className={`planet-orbit ${className}-orbit`} style={styles}>
                <div
                    className={`celestial-body ${className}`}
                    title={className}
                    ref={scrollToRef}
                    style={this.getCssValuesForBody()}
                >
                    {this.renderSatellites()}
                </div>
            </div>
        );
    }
}

CelestialBody.propTypes = {
    className: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    orbitRelative: PropTypes.bool,
    planetRadius: PropTypes.number,
    radiansPerMinute: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    satellites: PropTypes.arrayOf(PropTypes.shape({})),
    scrollToRef: PropTypes.shape({})
};

CelestialBody.defaultProps = {
    orbitRelative: false,
    planetRadius: null,
    satellites: [],
    scrollToRef: null
};

CelestialBody.contextType = SystemContext;

export default CelestialBody;

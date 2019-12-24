import React from "react";
import PropTypes from "prop-types";
import SystemContext from "../../../../SystemContext";
import "./CelestialBody.scss";

// The border makes orbits appear 1px larger than they are.
const BORDER_OFFSET = 1;

class CelestialBody extends React.Component {
    getCssValuesForOrbits() {
        const { systemRadius } = this.context;
        const { radius, orbitalPeriod, distance, isSatellite, planetRadius } = this.props;
        const referencePoint = isSatellite ? 0 : systemRadius;
        const referencePointRadius = isSatellite ? planetRadius : 0;
        const center = referencePoint - distance - radius - BORDER_OFFSET;
        const heightWidth = 2 * (distance + radius + referencePointRadius);

        return {
            animation: `orbit ${orbitalPeriod}s linear infinite`,
            borderRadius: "50%",
            height: `${heightWidth}px`,
            left: `${center}px`,
            position: "absolute",
            top: `${center}px`,
            width: `${heightWidth}px`
        };
    }

    getCssValuesForBody() {
        const { radius, orbitalPeriod, distance } = this.props;
        // Assume something with distance 0 (this sun) is already centered
        const top = distance > 0 ? "50%" : 0;
        const left = distance > 0 ? `${-radius - BORDER_OFFSET}px` : 0;

        return {
            animation: `planet-rotation ${orbitalPeriod}s linear infinite`,
            borderRadius: "50%",
            height: `${radius * 2}px`,
            left,
            minHeight: "1px",
            minWidth: "1px",
            position: "relative",
            top,
            width: `${radius * 2}px`
        };
    }

    renderSatellites() {
        const { satellites } = this.props;
        return satellites.map(satellite => (
            <CelestialBody key={`satellite-${satellite.className}`} isSatellite {...satellite} />
        ));
    }

    render() {
        const { className, scrollToRef } = this.props;

        return (
            <div className={`orbit ${className}-orbit`} style={this.getCssValuesForOrbits()}>
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
    isSatellite: PropTypes.bool,
    planetRadius: PropTypes.number,
    orbitalPeriod: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    satellites: PropTypes.arrayOf(PropTypes.shape({})),
    scrollToRef: PropTypes.shape({})
};

CelestialBody.defaultProps = {
    isSatellite: false,
    planetRadius: null,
    satellites: [],
    scrollToRef: null
};

CelestialBody.contextType = SystemContext;

export default CelestialBody;

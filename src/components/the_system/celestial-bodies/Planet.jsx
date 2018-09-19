import React from "react";
import PropTypes from "prop-types";
import CelestialBody from "./CelestialBody";
import { SunConsts } from "./CelestialBodiesConstants";

const Planet = props => {
    const {
        additionalClassNames,
        planetConstants,
        multipliers,
        systemRadius
    } = props;

    const radius = planetConstants.radius * multipliers.sizeMultiplier;
    const distance =
        planetConstants.distance * multipliers.distanceMultiplier +
        SunConsts.radius * multipliers.sunSizeMultiplier;
    const radiansPerMinute =
        planetConstants.orbitalPeriod * multipliers.orbitalPeriodMultiplier;

    return (
        <CelestialBody
            additionalClassNames={additionalClassNames}
            distance={distance}
            radiansPerMinute={radiansPerMinute}
            radius={radius}
            systemRadius={systemRadius}
        />
    );
};

Planet.propTypes = {
    additionalClassNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    planetConstants: PropTypes.shape({
        radius: PropTypes.number.isRequired,
        distance: PropTypes.number.isRequired,
        orbitalPeriod: PropTypes.number.isRequired
    }).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Planet;

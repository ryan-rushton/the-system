import React from "react";
import PropTypes from "prop-types";
import CelestialBody from "./CelestialBody";
import { SunConsts } from "./CelestialBodiesConstants";

const moonToCB = (moon, multipliers, planetRadius) => {
    const { className, radius, orbitalPeriod, distance } = moon;
    const { distanceMultiplier, orbitalPeriodMultiplier, sizeMultiplier } = multipliers;
    const moonRadius = radius * sizeMultiplier;

    return {
        className,
        radius: moonRadius,
        distance: distance * distanceMultiplier + planetRadius + moonRadius,
        radiansPerMinute: orbitalPeriod * orbitalPeriodMultiplier,
        systemRadius: planetRadius
    };
};

const Planet = props => {
    const { name, moons, planetConstants, multipliers, systemRadius } = props;
    const {
        distanceMultiplier,
        orbitalPeriodMultiplier,
        sizeMultiplier,
        sunSizeMultiplier
    } = multipliers;

    const planetRadius = planetConstants.radius * sizeMultiplier;
    const planetDistance = planetConstants.distance * distanceMultiplier;
    const sunRadius = SunConsts.radius * sunSizeMultiplier;
    const distance = planetDistance + sunRadius + planetRadius;
    const radiansPerMinute = planetConstants.orbitalPeriod * orbitalPeriodMultiplier;

    const satellites = moons.map(moon => moonToCB(moon, multipliers, planetRadius));

    return (
        <CelestialBody
            className={name}
            distance={distance}
            radiansPerMinute={radiansPerMinute}
            radius={planetRadius}
            satellites={satellites}
            systemRadius={systemRadius}
        />
    );
};

Planet.propTypes = {
    name: PropTypes.string.isRequired,
    moons: PropTypes.arrayOf(PropTypes.shape({})),
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    planetConstants: PropTypes.shape({
        radius: PropTypes.number.isRequired,
        distance: PropTypes.number.isRequired,
        orbitalPeriod: PropTypes.number.isRequired
    }).isRequired,
    systemRadius: PropTypes.number.isRequired
};

Planet.defaultProps = {
    moons: []
};

export default Planet;

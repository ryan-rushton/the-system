import React from "react";
import PropTypes from "prop-types";
import CelestialBody from "./CelestialBody";

const moonToCB = (moon, multipliers, planetRadius) => {
    const { className, radius, orbitalPeriod, distance } = moon;
    const { satelliteDist, orbitalPeriodMultiplier, sizeMultiplier } = multipliers;
    const moonRadius = radius * sizeMultiplier;

    return {
        className,
        radius: moonRadius,
        distance: distance * satelliteDist - planetRadius * sizeMultiplier - moonRadius,
        radiansPerMinute: orbitalPeriod * orbitalPeriodMultiplier,
        systemRadius: planetRadius
    };
};

const applyMultipliers = (consts, mults) => ({
    distance: consts.distance * mults.distanceMultiplier - consts.radius * mults.sizeMultiplier,
    radius: consts.radius * mults.sizeMultiplier,
    orbitalPeriod: consts.orbitalPeriod * mults.orbitalPeriodMultiplier
});

const Planet = props => {
    const { name, moons, planetConstants, multipliers, systemRadius } = props;
    const { distance, radius, orbitalPeriod } = applyMultipliers(planetConstants, multipliers);

    const satellites = moons.map(moon => moonToCB(moon, multipliers, radius));

    return (
        <CelestialBody
            className={name}
            distance={distance}
            radiansPerMinute={orbitalPeriod}
            radius={radius}
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

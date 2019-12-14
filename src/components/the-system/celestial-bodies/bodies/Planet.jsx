import React, { useContext } from "react";
import PropTypes from "prop-types";
import SystemContext from "../../../../SystemContext";
import CelestialBody from "./CelestialBody";
import { SunConsts } from "../../../../SharedConsts";

const moonToCB = (moon, multipliers, planetRadius) => {
    const { className, radius, orbitalPeriod, distance } = moon;
    const { satelliteDist, orbitalPeriodMultiplier, sizeMultiplier } = multipliers;
    const moonRadius = radius * sizeMultiplier;

    return {
        className,
        radius: moonRadius,
        distance: distance * satelliteDist - planetRadius * sizeMultiplier - moonRadius,
        orbitalPeriod: orbitalPeriod * orbitalPeriodMultiplier,
        planetRadius
    };
};

const applyMultipliers = (consts, multipliers) => ({
    distance:
        consts.distance * multipliers.distanceMultiplier +
        (SunConsts.radius - consts.radius) * multipliers.sizeMultiplier,
    radius: consts.radius * multipliers.sizeMultiplier,
    orbitalPeriod: consts.orbitalPeriod * multipliers.orbitalPeriodMultiplier
});

const Planet = props => {
    const { name, moons, planetConstants, scrollToRef } = props;
    const { multipliers } = useContext(SystemContext);
    const { distance, radius, orbitalPeriod } = applyMultipliers(planetConstants, multipliers);
    const satellites = moons.map(moon => moonToCB(moon, multipliers, radius));

    return (
        <CelestialBody
            className={name}
            distance={distance}
            orbitalPeriod={orbitalPeriod}
            radius={radius}
            satellites={satellites}
            scrollToRef={scrollToRef}
        />
    );
};

Planet.propTypes = {
    name: PropTypes.string.isRequired,
    moons: PropTypes.arrayOf(PropTypes.shape({})),
    planetConstants: PropTypes.shape({
        radius: PropTypes.number.isRequired,
        distance: PropTypes.number.isRequired,
        orbitalPeriod: PropTypes.number.isRequired
    }).isRequired,
    scrollToRef: PropTypes.shape({})
};

Planet.defaultProps = {
    moons: [],
    scrollToRef: null
};

export default Planet;

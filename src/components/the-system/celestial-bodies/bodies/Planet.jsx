import React from "react";
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

const applyMultipliers = (consts, mults) => ({
    distance:
        consts.distance * mults.distanceMultiplier +
        (SunConsts.radius - consts.radius) * mults.sizeMultiplier,
    radius: consts.radius * mults.sizeMultiplier,
    orbitalPeriod: consts.orbitalPeriod * mults.orbitalPeriodMultiplier
});

const planet = (name, moons, planetConstants, scrollToRef, context) => {
    const { multipliers } = context;
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

const Planet = props => {
    const { name, moons, planetConstants, scrollToRef } = props;
    return (
        <SystemContext.Consumer>
            {context => planet(name, moons, planetConstants, scrollToRef, context)}
        </SystemContext.Consumer>
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

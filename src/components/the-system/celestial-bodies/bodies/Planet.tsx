import React, { useContext, RefObject, ReactElement } from "react";
import PropTypes from "prop-types";
import AppContext, { SystemMultipliers } from "../../../../SystemContext";
import CelestialBody, { CelestialBodyProps } from "./CelestialBody";
import { SunConsts } from "../../../../SharedConsts";
import { MoonDetails, PlanetDetails } from "../../../../types";

const moonToCB = (
    moon: MoonDetails,
    multipliers: SystemMultipliers,
    planetRadius: number
): CelestialBodyProps => {
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

const applyMultipliers = (
    consts: PlanetDetails,
    multipliers: SystemMultipliers
): PlanetDetails => ({
    distance:
        consts.distance * multipliers.distanceMultiplier +
        (SunConsts.radius - consts.radius) * multipliers.sizeMultiplier,
    radius: consts.radius * multipliers.sizeMultiplier,
    orbitalPeriod: consts.orbitalPeriod * multipliers.orbitalPeriodMultiplier
});

interface Props {
    name: string;
    planetConstants: PlanetDetails;
    scrollToRef: RefObject<HTMLDivElement>;
    moons?: MoonDetails[];
}

function Planet({ name, moons, planetConstants, scrollToRef }: Props): ReactElement {
    const { multipliers } = useContext(AppContext);
    const { distance, radius, orbitalPeriod } = applyMultipliers(planetConstants, multipliers);
    const satellites = moons?.map((moon: MoonDetails) => moonToCB(moon, multipliers, radius));

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
}

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

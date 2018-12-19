import React from "react";
import PropTypes from "prop-types";
import Planet from "./planet/Planet";

export const JupiterConsts = {
    radius: 71498,
    distance: 778600000,
    orbitalPeriod: 4331
};

const io = {
    className: "io",
    distance: 421700,
    orbitalPeriod: 1.77,
    radius: 1822
};

const europa = {
    className: "europa",
    distance: 670900,
    orbitalPeriod: 3.55,
    radius: 1561
};

const ganymede = {
    className: "ganymede",
    distance: 1070400,
    orbitalPeriod: 7.15,
    radius: 2634
};

const callisto = {
    className: "callisto",
    distance: 1882700,
    orbitalPeriod: 16.69,
    radius: 2410
};

const Jupiter = props => {
    const { multipliers, systemRadius } = props;
    const name = "jupiter";

    return (
        <Planet
            name={name}
            multipliers={multipliers}
            planetConstants={JupiterConsts}
            moons={[io, europa, ganymede, callisto]}
            systemRadius={systemRadius}
        />
    );
};

Jupiter.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Jupiter;

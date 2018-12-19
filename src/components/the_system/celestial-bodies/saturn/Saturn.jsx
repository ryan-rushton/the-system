import React from "react";
import PropTypes from "prop-types";
import Planet from "../planet/Planet";
import "./Saturn.scss";

// This is radius including the rings
export const SaturnConsts = {
    radius: 58232,
    distance: 1433500000,
    orbitalPeriod: 10747
};

const titan = {
    className: "titan",
    distance: 1221870,
    orbitalPeriod: 15.95,
    radius: 2574
};

const rhea = {
    className: "rhea",
    distance: 527108,
    orbitalPeriod: 1.77,
    radius: 764
};

const Saturn = props => {
    const { multipliers, systemRadius } = props;
    const name = "saturn";

    return (
        <Planet
            name={name}
            moons={[rhea, titan]}
            multipliers={multipliers}
            planetConstants={SaturnConsts}
            systemRadius={systemRadius}
        />
    );
};

Saturn.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Saturn;

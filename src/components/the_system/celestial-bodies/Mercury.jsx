import React from "react";
import PropTypes from "prop-types";
import Planet from "./planet/Planet";

const MercuryConsts = {
    radius: 2440,
    distance: 57900000,
    orbitalPeriod: 88
};

const Mercury = props => {
    const { multipliers, systemRadius } = props;
    const name = "mercury";

    return (
        <Planet
            name={name}
            multipliers={multipliers}
            planetConstants={MercuryConsts}
            systemRadius={systemRadius}
        />
    );
};

Mercury.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Mercury;

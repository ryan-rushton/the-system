import React from "react";
import PropTypes from "prop-types";
import Planet from "./planet/Planet";

const UranusConsts = {
    radius: 25559,
    distance: 2872500000,
    orbitalPeriod: 30589
};

const Uranus = props => {
    const { multipliers, systemRadius } = props;
    const name = "uranus";

    return (
        <Planet
            name={name}
            multipliers={multipliers}
            planetConstants={UranusConsts}
            systemRadius={systemRadius}
        />
    );
};

Uranus.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Uranus;

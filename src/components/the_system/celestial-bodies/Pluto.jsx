import React from "react";
import PropTypes from "prop-types";
import Planet from "./planet/Planet";

export const PlutoConsts = {
    radius: 1185,
    distance: 5906400000,
    orbitalPeriod: 90560
};

const Pluto = props => {
    const { multipliers, systemRadius } = props;
    const name = "pluto";

    return (
        <Planet
            name={name}
            multipliers={multipliers}
            planetConstants={PlutoConsts}
            systemRadius={systemRadius}
        />
    );
};

Pluto.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Pluto;

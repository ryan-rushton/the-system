import React from "react";
import PropTypes from "prop-types";
import Planet from "./planet/Planet";

export const MarsConsts = {
    radius: 3396,
    distance: 227900000,
    orbitalPeriod: 687
};

const Mars = props => {
    const { multipliers, systemRadius } = props;
    const name = "mars";

    return (
        <Planet
            name={name}
            multipliers={multipliers}
            planetConstants={MarsConsts}
            systemRadius={systemRadius}
        />
    );
};

Mars.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Mars;

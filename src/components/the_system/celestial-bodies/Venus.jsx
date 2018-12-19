import React from "react";
import PropTypes from "prop-types";
import Planet from "./planet/Planet";

const VenusConsts = {
    radius: 6052,
    distance: 108200000,
    orbitalPeriod: 224.7
};

const Venus = props => {
    const { multipliers, systemRadius } = props;
    const name = "venus";

    return (
        <Planet
            name={name}
            multipliers={multipliers}
            planetConstants={VenusConsts}
            systemRadius={systemRadius}
        />
    );
};

Venus.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Venus;

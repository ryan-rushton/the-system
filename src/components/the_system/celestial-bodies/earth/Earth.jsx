import React from "react";
import PropTypes from "prop-types";
import Planet from "../planet/Planet";

const earthConsts = {
    radius: 6378,
    distance: 149600000,
    orbitalPeriod: 365.2
};

const moon = {
    className: "moon",
    distance: 384400,
    orbitalPeriod: 27.3,
    radius: 1737
};

const Earth = props => {
    const { multipliers, systemRadius } = props;
    const name = "earth";

    return (
        <Planet
            name={name}
            multipliers={multipliers}
            planetConstants={earthConsts}
            moons={[moon]}
            systemRadius={systemRadius}
        />
    );
};

Earth.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Earth;

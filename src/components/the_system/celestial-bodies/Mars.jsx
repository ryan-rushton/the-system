import React from "react";
import PropTypes from "prop-types";
import Planet from "./Planet";
import { MarsConsts } from "./CelestialBodiesConstants";
import "./Planets.css";

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

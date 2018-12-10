import React from "react";
import PropTypes from "prop-types";
import Planet from "./Planet";
import { JupiterConsts } from "./CelestialBodiesConstants";
import "./Planets.scss";

const Jupiter = props => {
    const { multipliers, systemRadius } = props;
    const name = "jupiter";

    return (
        <Planet
            name={name}
            multipliers={multipliers}
            planetConstants={JupiterConsts}
            systemRadius={systemRadius}
        />
    );
};

Jupiter.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Jupiter;

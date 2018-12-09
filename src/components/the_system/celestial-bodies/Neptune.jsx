import React from "react";
import PropTypes from "prop-types";
import Planet from "./Planet";
import { NeptuneConsts } from "./CelestialBodiesConstants";
import "./Planets.css";

const Neptume = props => {
    const { multipliers, systemRadius } = props;
    const name = "neptune";

    return (
        <Planet
            name={name}
            multipliers={multipliers}
            planetConstants={NeptuneConsts}
            systemRadius={systemRadius}
        />
    );
};

Neptume.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Neptume;

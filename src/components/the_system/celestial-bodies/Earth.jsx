import React from "react";
import PropTypes from "prop-types";
import Planet from "./Planet";
import { EarthConsts } from "./CelestialBodiesConstants";
import "./Planets.css";

const Earth = props => {
    const { multipliers, systemRadius } = props;
    const additionalClassNames = ["earth"];

    return (
        <Planet
            additionalClassNames={additionalClassNames}
            multipliers={multipliers}
            planetConstants={EarthConsts}
            systemRadius={systemRadius}
        />
    );
};

Earth.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Earth;

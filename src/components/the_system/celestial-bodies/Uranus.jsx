import React from "react";
import PropTypes from "prop-types";
import Planet from "./Planet";
import { UranusConsts } from "./CelestialBodiesConstants";
import "./Planets.css";

const Uranus = props => {
    const { multipliers, systemRadius } = props;
    const additionalClassNames = ["uranus"];

    return (
        <Planet
            additionalClassNames={additionalClassNames}
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

import React from "react";
import PropTypes from "prop-types";
import Planet from "./Planet";
import { PlutoConsts } from "./CelestialBodiesConstants";
import "./Planets.css";

const Pluto = props => {
    const { multipliers, systemRadius } = props;
    const additionalClassNames = ["pluto"];

    return (
        <Planet
            additionalClassNames={additionalClassNames}
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

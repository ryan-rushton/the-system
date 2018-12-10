import React from "react";
import PropTypes from "prop-types";
import Planet from "./Planet";
import { PlutoConsts } from "./PlanetConstants";
import "./Planets.scss";

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

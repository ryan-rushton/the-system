import React from "react";
import PropTypes from "prop-types";
import Planet from "./Planet";
import { NeptuneConsts } from "./PlanetConstants";
import "./Planets.scss";

const Neptune = props => {
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

Neptune.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Neptune;

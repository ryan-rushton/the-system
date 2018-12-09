import React from "react";
import PropTypes from "prop-types";
import Planet from "./Planet";
import { VenusConsts } from "./CelestialBodiesConstants";
import "./Planets.css";

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

import React from "react";
import PropTypes from "prop-types";
import Planet from "../Planet";
import "./Saturn.css";

export const SaturnConsts = {
    radius: 138232,
    distance: 1433500000,
    orbitalPeriod: 10747
};

const Saturn = props => {
    const { multipliers, systemRadius } = props;
    const additionalClassNames = ["saturn"];

    return (
        <Planet
            additionalClassNames={additionalClassNames}
            multipliers={multipliers}
            planetConstants={SaturnConsts}
            systemRadius={systemRadius}
        />
    );
};

Saturn.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Saturn;

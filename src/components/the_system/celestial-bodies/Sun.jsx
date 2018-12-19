import React from "react";
import PropTypes from "prop-types";
import CelestialBody from "./celestial-body/CelestialBody";
import "./Sun.scss";

export const SunConsts = {
    radius: 695508,
    distance: 0,
    orbitalPeriod: 1
};

const Sun = props => {
    const { multipliers, systemRadius } = props;
    const name = "sun";
    const radius = SunConsts.radius * multipliers.sunSizeMultiplier;

    return (
        <CelestialBody
            className={name}
            distance={0}
            radius={radius}
            radiansPerMinute={0}
            systemRadius={systemRadius}
        />
    );
};

Sun.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default Sun;

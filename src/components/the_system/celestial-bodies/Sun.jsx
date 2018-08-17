import React from "react";
import PropTypes from "prop-types";
import "./Sun.css";
import CelestialBody from "./CelestialBody";
import { SunConsts } from "./CelestialBodiesConstants";

const Sun = props => {
    const { multipliers, systemRadius } = props;
    const additionalClassNames = ["sun"];
    const radius = SunConsts.radius * multipliers.sunSizeMultiplier;

    return (
        <CelestialBody
            additionalClassNames={additionalClassNames}
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

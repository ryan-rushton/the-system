import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import SystemContext from "../../../SystemContext";
import { SunConsts } from "../../../SharedConsts";
import CelestialBody from "./bodies/CelestialBody";

const getRadius = mult => mult * SunConsts.radius;

const Sun = ({ scrollToRef }) => {
    const context = useContext(SystemContext);

    return (
        <CelestialBody
            className="sun"
            distance={0}
            radius={getRadius(context.multipliers.sizeMultiplier)}
            orbitalPeriod={0}
            scrollToRef={scrollToRef}
        />
    );
};

Sun.propTypes = {
    scrollToRef: PropTypes.shape({}).isRequired
};

export default Sun;

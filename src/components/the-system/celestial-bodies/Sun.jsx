import React from "react";
import { PropTypes } from "prop-types";
import SystemContext from "../../../SystemContext";
import { SunConsts } from "../../../SharedConsts";
import CelestialBody from "./bodies/CelestialBody";

const getRadius = mult => mult * SunConsts.radius;

const Sun = ({ scrollToRef }) => (
    <SystemContext.Consumer>
        {context => (
            <CelestialBody
                className="sun"
                distance={0}
                radius={getRadius(context.multipliers.sizeMultiplier)}
                orbitalPeriod={0}
                scrollToRef={scrollToRef}
            />
        )}
    </SystemContext.Consumer>
);

Sun.propTypes = {
    scrollToRef: PropTypes.shape({}).isRequired
};

export default Sun;

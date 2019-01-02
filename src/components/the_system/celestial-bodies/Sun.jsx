import React from "react";
import { PropTypes } from "prop-types";
import SystemContext from "../SystemContext";
import { SunConsts } from "../SharedConsts";
import CelestialBody from "./celestial-body/CelestialBody";
import "./Sun.scss";

const getRadius = mult => mult * SunConsts.radius;

const Sun = ({ scrollToRef }) => {
    const name = "sun";

    return (
        <SystemContext.Consumer>
            {context => (
                <CelestialBody
                    className={name}
                    distance={0}
                    radius={getRadius(context.multipliers.sunSizeMultiplier)}
                    radiansPerMinute={0}
                    scrollToRef={scrollToRef}
                />
            )}
        </SystemContext.Consumer>
    );
};

Sun.propTypes = {
    scrollToRef: PropTypes.shape({}).isRequired
};

export default Sun;

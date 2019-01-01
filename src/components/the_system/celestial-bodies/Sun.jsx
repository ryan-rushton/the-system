import React from "react";
import SystemContext from "../SystemContext";
import { SunConsts } from "../SharedConsts";
import CelestialBody from "./celestial-body/CelestialBody";
import "./Sun.scss";

const getRadius = mult => mult * SunConsts.radius;

const Sun = () => {
    const name = "sun";

    return (
        <SystemContext.Consumer>
            {context => (
                <CelestialBody
                    className={name}
                    distance={0}
                    radius={getRadius(context.multipliers.sunSizeMultiplier)}
                    radiansPerMinute={0}
                />
            )}
        </SystemContext.Consumer>
    );
};

export default Sun;

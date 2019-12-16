import React from "react";
import { SunConsts, PlutoConsts } from "./SharedConsts";

const evenSpaceMultipliers = {
    sizeMultiplier: 0.0005,
    orbitalPeriodMultiplier: 20,
    distanceMultiplier: 0.0005,
    satelliteDist: 0.0005
};

const enhancedVisibilityMultipliers = {
    sizeMultiplier: 0.0005,
    orbitalPeriodMultiplier: 1,
    distanceMultiplier: 0.00001,
    satelliteDist: 0.0001
};

/**
 * Need to make sure that the outer edge includes the space needed for the pluto orbit div to rotate
 */
const getSystemRadius = ({ distanceMultiplier, sizeMultiplier }) => {
    const sunRadius = sizeMultiplier * SunConsts.radius;
    const plutoDistance = sunRadius + distanceMultiplier * PlutoConsts.distance;
    const plutoOuterEdge = plutoDistance + 2 * sizeMultiplier * PlutoConsts.radius;

    return Math.sqrt(2 * plutoOuterEdge ** 2);
};

const enhancedVisibility = {
    multipliers: enhancedVisibilityMultipliers,
    systemRadius: getSystemRadius(enhancedVisibilityMultipliers)
};

const evenSpace = {
    multipliers: evenSpaceMultipliers,
    systemRadius: getSystemRadius(evenSpaceMultipliers)
};

export const systemSize = { enhancedVisibility, evenSpace };

const SystemContext = React.createContext();

export default SystemContext;

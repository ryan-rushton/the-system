import React from "react";
import { SunConsts, PlutoConsts } from "./SharedConsts";

export interface SystemMultipliers {
    sizeMultiplier: number;
    orbitalPeriodMultiplier: number;
    distanceMultiplier: number;
    satelliteDist: number;
}

export interface SystemContext {
    multipliers: SystemMultipliers;
    systemRadius: number;
}

const evenSpaceMultipliers: SystemMultipliers = {
    sizeMultiplier: 0.0005,
    orbitalPeriodMultiplier: 20,
    distanceMultiplier: 0.0005,
    satelliteDist: 0.0005
};

const enhancedVisibilityMultipliers: SystemMultipliers = {
    sizeMultiplier: 0.0005,
    orbitalPeriodMultiplier: 1,
    distanceMultiplier: 0.00001,
    satelliteDist: 0.0001
};

/**
 * Need to make sure that the outer edge includes the space needed for the pluto orbit div to rotate
 */
function getSystemRadius({ distanceMultiplier, sizeMultiplier }: SystemMultipliers): number {
    const sunRadius = sizeMultiplier * SunConsts.radius;
    const plutoDistance = sunRadius + distanceMultiplier * PlutoConsts.distance;
    const plutoOuterEdge = plutoDistance + 2 * sizeMultiplier * PlutoConsts.radius;

    return Math.sqrt(2 * plutoOuterEdge ** 2);
}

const enhancedVisibility: SystemContext = {
    multipliers: enhancedVisibilityMultipliers,
    systemRadius: getSystemRadius(enhancedVisibilityMultipliers)
};

const evenSpace: SystemContext = {
    multipliers: evenSpaceMultipliers,
    systemRadius: getSystemRadius(evenSpaceMultipliers)
};

export const systemSize: { enhancedVisibility: SystemContext; evenSpace: SystemContext } = {
    enhancedVisibility,
    evenSpace
};

const AppContext: React.Context<SystemContext> = React.createContext<SystemContext>(
    enhancedVisibility
);

export default AppContext;

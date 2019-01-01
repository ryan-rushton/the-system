import React from "react";
import { SunConsts, PlutoConsts } from "./SharedConsts";

const EDGE_BUFFER = 250;

const multipliers = {
    sizeMultiplier: 0.0005,
    sunSizeMultiplier: 0.0002,
    orbitalPeriodMultiplier: 1,
    distanceMultiplier: 0.000005,
    satelliteDist: 0.000025
};

const systemRadius =
    multipliers.distanceMultiplier * PlutoConsts.distance +
    2 * multipliers.sizeMultiplier * PlutoConsts.radius +
    multipliers.sunSizeMultiplier * SunConsts.radius +
    EDGE_BUFFER;

export const defaultContext = {
    multipliers,
    systemRadius
};

const SystemContext = React.createContext();

export default SystemContext;

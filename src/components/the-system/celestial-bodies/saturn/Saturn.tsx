import React, { RefObject, ReactElement } from "react";
import Planet from "../bodies/Planet";
import "./Saturn.scss";

// This is radius including the rings
export const SaturnConsts = {
    radius: 80000 + 58232,
    distance: 1433500000,
    orbitalPeriod: 10747
};

const titan = {
    className: "titan",
    distance: 1221870,
    orbitalPeriod: 15.95,
    radius: 2574
};

const rhea = {
    className: "rhea",
    distance: 527108,
    orbitalPeriod: 1.77,
    radius: 764
};

interface Props {
    scrollToRef: RefObject<HTMLDivElement>;
}

const Saturn = ({ scrollToRef }: Props): ReactElement => (
    <Planet
        name="saturn"
        moons={[rhea, titan]}
        planetConstants={SaturnConsts}
        scrollToRef={scrollToRef}
    />
);

export default Saturn;

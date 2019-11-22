import React from "react";
import { PropTypes } from "prop-types";
import Planet from "../bodies/Planet";

import "./Jupiter.scss";

export const JupiterConsts = {
    radius: 71498,
    distance: 778600000,
    orbitalPeriod: 4331
};

const io = {
    className: "io",
    distance: 421700,
    orbitalPeriod: 1.77,
    radius: 1822
};

const europa = {
    className: "europa",
    distance: 670900,
    orbitalPeriod: 3.55,
    radius: 1561
};

const ganymede = {
    className: "ganymede",
    distance: 1070400,
    orbitalPeriod: 7.15,
    radius: 2634
};

const callisto = {
    className: "callisto",
    distance: 1882700,
    orbitalPeriod: 16.69,
    radius: 2410
};

const Jupiter = ({ scrollToRef }) => (
    <Planet
        name="jupiter"
        planetConstants={JupiterConsts}
        moons={[io, europa, ganymede, callisto]}
        scrollToRef={scrollToRef}
    />
);

Jupiter.propTypes = {
    scrollToRef: PropTypes.shape({}).isRequired
};

export default Jupiter;

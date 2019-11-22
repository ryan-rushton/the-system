import React from "react";
import { PropTypes } from "prop-types";
import Planet from "../planet/Planet";

const earthConsts = {
    radius: 6378,
    distance: 149600000,
    orbitalPeriod: 365.2
};

const moon = {
    className: "moon",
    distance: 384400,
    orbitalPeriod: 27.3,
    radius: 1737
};

const Earth = ({ scrollToRef }) => (
    <Planet name="earth" planetConstants={earthConsts} moons={[moon]} scrollToRef={scrollToRef} />
);

Earth.propTypes = {
    scrollToRef: PropTypes.shape({}).isRequired
};

export default Earth;

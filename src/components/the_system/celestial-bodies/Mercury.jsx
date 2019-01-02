import React from "react";
import { PropTypes } from "prop-types";
import Planet from "./planet/Planet";

const MercuryConsts = {
    radius: 2440,
    distance: 57900000,
    orbitalPeriod: 88
};

const Mercury = ({ scrollToRef }) => {
    const name = "mercury";

    return <Planet name={name} planetConstants={MercuryConsts} scrollToRef={scrollToRef} />;
};

Mercury.propTypes = {
    scrollToRef: PropTypes.shape({}).isRequired
};

export default Mercury;

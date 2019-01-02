import React from "react";
import { PropTypes } from "prop-types";
import Planet from "./planet/Planet";

const UranusConsts = {
    radius: 25559,
    distance: 2872500000,
    orbitalPeriod: 30589
};

const Uranus = ({ scrollToRef }) => {
    const name = "uranus";

    return <Planet name={name} planetConstants={UranusConsts} scrollToRef={scrollToRef} />;
};

Uranus.propTypes = {
    scrollToRef: PropTypes.shape({}).isRequired
};

export default Uranus;

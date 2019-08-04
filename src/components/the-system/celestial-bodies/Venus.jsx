import React from "react";
import { PropTypes } from "prop-types";
import Planet from "./planet/Planet";

const VenusConsts = {
    radius: 6052,
    distance: 108200000,
    orbitalPeriod: 224.7
};

const Venus = ({ scrollToRef }) => {
    const name = "venus";

    return <Planet name={name} planetConstants={VenusConsts} scrollToRef={scrollToRef} />;
};

Venus.propTypes = {
    scrollToRef: PropTypes.shape({}).isRequired
};

export default Venus;

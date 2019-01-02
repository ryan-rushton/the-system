import React from "react";
import { PropTypes } from "prop-types";
import Planet from "./planet/Planet";

export const MarsConsts = {
    radius: 3396,
    distance: 227900000,
    orbitalPeriod: 687
};

const Mars = ({ scrollToRef }) => {
    const name = "mars";

    return <Planet name={name} planetConstants={MarsConsts} scrollToRef={scrollToRef} />;
};

Mars.propTypes = {
    scrollToRef: PropTypes.shape({}).isRequired
};

export default Mars;

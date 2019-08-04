import React from "react";
import { PropTypes } from "prop-types";
import { PlutoConsts } from "../SharedConsts";
import Planet from "./planet/Planet";

const Pluto = ({ scrollToRef }) => {
    const name = "pluto";

    return <Planet name={name} planetConstants={PlutoConsts} scrollToRef={scrollToRef} />;
};

Pluto.propTypes = {
    scrollToRef: PropTypes.shape({}).isRequired
};

export default Pluto;

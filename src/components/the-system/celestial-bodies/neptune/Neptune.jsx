import React from "react";
import { PropTypes } from "prop-types";
import Planet from "../planet/Planet";

import "./Neptune.scss";

const NeptuneConsts = {
    radius: 24764,
    distance: 4495100000,
    orbitalPeriod: 59800
};

const Neptune = ({ scrollToRef }) => {
    const name = "neptune";

    return <Planet name={name} planetConstants={NeptuneConsts} scrollToRef={scrollToRef} />;
};

Neptune.propTypes = {
    scrollToRef: PropTypes.shape({}).isRequired
};

export default Neptune;

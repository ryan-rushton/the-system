import React from "react";
import PropTypes from "prop-types";

const Star = ({ x, y, luminosity, size }) => {
    const style = {
        animation: `fadeIn 2s linear`,
        backgroundColor: `rgb(255, 255, 255, ${luminosity})`,
        height: size,
        left: x,
        top: y,
        width: size
    };
    return <div className="star" style={style} />;
};

Star.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    luminosity: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired
};

export default Star;

import React from "react";
import { PropTypes } from "prop-types";
import SystemContext from "../SystemContext";
import Star from "./Star";

const getStars = (systemRadius, starCount) => {
    const stars = [];
    let starValues = {};

    for (let i = 0; i < starCount; i += 1) {
        starValues = {
            x: 2 * systemRadius * Math.random(),
            y: 2 * systemRadius * Math.random(),
            luminosity: 0.3 + 0.7 * Math.random(),
            size: 1 + Math.random()
        };
        stars.push(<Star {...starValues} key={`star-${i}`} />);
    }

    return stars;
};

const TheStars = props => {
    const { starCount } = props;

    return (
        <div className="the-stars">
            <SystemContext.Consumer>
                {context => getStars(context.systemRadius, starCount)}
            </SystemContext.Consumer>
        </div>
    );
};

TheStars.propTypes = {
    starCount: PropTypes.number.isRequired
};

export default TheStars;

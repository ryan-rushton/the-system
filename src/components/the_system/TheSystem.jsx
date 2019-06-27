import React from "react";
import PropTypes from "prop-types";
import SystemContext, { defaultContext } from "./SystemContext";
import TheStars from "./the-stars/TheStars";
import Sun from "./celestial-bodies/Sun";
import TheBelt from "./ the-belt/TheBelt";
import Mercury from "./celestial-bodies/Mercury";
import Venus from "./celestial-bodies/Venus";
import Earth from "./celestial-bodies/earth/Earth";
import Mars from "./celestial-bodies/Mars";
import Jupiter from "./celestial-bodies/jupiter/Jupiter";
import Saturn from "./celestial-bodies/saturn/Saturn";
import Uranus from "./celestial-bodies/Uranus";
import Neptune from "./celestial-bodies/Neptune";
import Pluto from "./celestial-bodies/Pluto";

import "./TheSystem.scss";
import "./celestial-bodies/Planets.scss";

const STAR_COUNT = 30000;

const systemStyle = systemRadius => ({
    height: `${2 * systemRadius}px`,
    width: `${2 * systemRadius}px`
});

const TheSystem = ({ pointsOfInterest }) => (
    <SystemContext.Provider value={defaultContext}>
        <SystemContext.Consumer>
            {context => (
                <div className="the-system" style={systemStyle(context.systemRadius)}>
                    <TheStars starCount={STAR_COUNT} />
                    <TheBelt />
                    <Sun scrollToRef={pointsOfInterest.sun.ref} />
                    <Mercury scrollToRef={pointsOfInterest.mercury.ref} />
                    <Venus scrollToRef={pointsOfInterest.venus.ref} />
                    <Earth scrollToRef={pointsOfInterest.earth.ref} />
                    <Mars scrollToRef={pointsOfInterest.mars.ref} />
                    <Jupiter scrollToRef={pointsOfInterest.jupiter.ref} />
                    <Saturn scrollToRef={pointsOfInterest.saturn.ref} />
                    <Uranus scrollToRef={pointsOfInterest.uranus.ref} />
                    <Neptune scrollToRef={pointsOfInterest.neptune.ref} />
                    <Pluto scrollToRef={pointsOfInterest.pluto.ref} />
                </div>
            )}
        </SystemContext.Consumer>
    </SystemContext.Provider>
);

TheSystem.propTypes = {
    pointsOfInterest: PropTypes.shape({}).isRequired
};

export default TheSystem;

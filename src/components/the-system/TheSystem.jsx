import React from "react";
import PropTypes from "prop-types";
import SystemContext from "../../SystemContext";
import Sun from "./celestial-bodies/Sun";
import TheBelt from "./ the-belt/TheBelt";
import Earth from "./celestial-bodies/earth/Earth";
import Jupiter from "./celestial-bodies/jupiter/Jupiter";
import Saturn from "./celestial-bodies/saturn/Saturn";
import Neptune from "./celestial-bodies/neptune/Neptune";
import Planet from "./celestial-bodies/bodies/Planet";
import { PlutoConsts } from "../../SharedConsts";

import "./TheSystem.scss";

const MercuryConsts = {
    radius: 2440,
    distance: 57900000,
    orbitalPeriod: 88
};

const VenusConsts = {
    radius: 6052,
    distance: 108200000,
    orbitalPeriod: 224.7
};

export const MarsConsts = {
    radius: 3396,
    distance: 227900000,
    orbitalPeriod: 687
};

const UranusConsts = {
    radius: 25559,
    distance: 2872500000,
    orbitalPeriod: 30589
};

const systemStyle = systemRadius => ({
    height: `${2 * systemRadius}px`,
    width: `${2 * systemRadius}px`
});

const createPlanet = (name, consts, scrollToRef) => (
    <Planet name={name} planetConstants={consts} scrollToRef={scrollToRef} />
);

class TheSystem extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {
            sun,
            mercury,
            venus,
            earth,
            mars,
            theBelt,
            jupiter,
            saturn,
            uranus,
            neptune,
            pluto
        } = this.props.pointsOfInterest;
        return (
            <SystemContext.Consumer>
                {({ systemRadius }) => (
                    <div className="the-system" style={systemStyle(systemRadius)}>
                        <div className="the-system-suns-glow" style={systemStyle(systemRadius)}>
                            {createPlanet("pluto", PlutoConsts, pluto.ref)}
                            <Neptune scrollToRef={neptune.ref} />
                            {createPlanet("uranus", UranusConsts, uranus.ref)}
                            <Jupiter scrollToRef={jupiter.ref} />
                            <Saturn scrollToRef={saturn.ref} />
                            <TheBelt scrollToRef={theBelt.ref} />
                            {createPlanet("mars", MarsConsts, mars.ref)}
                            <Earth scrollToRef={earth.ref} />
                            {createPlanet("venus", VenusConsts, venus.ref)}
                            {createPlanet("mercury", MercuryConsts, mercury.ref)}
                            <Sun scrollToRef={sun.ref} />
                        </div>
                    </div>
                )}
            </SystemContext.Consumer>
        );
    }
}

const refShape = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
]);

TheSystem.propTypes = {
    pointsOfInterest: PropTypes.shape({
        pluto: refShape,
        neptune: refShape,
        uranus: refShape,
        jupiter: refShape,
        saturn: refShape,
        mars: refShape,
        earth: refShape,
        venus: refShape,
        mercury: refShape,
        sun: refShape
    }).isRequired
};

export default TheSystem;

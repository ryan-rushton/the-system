import React from "react";
import PropTypes from "prop-types";
import SystemContext, { defaultContext } from "./SystemContext";
import Sun from "./celestial-bodies/Sun";
import TheBelt from "./ the-belt/TheBelt";
import Mercury from "./celestial-bodies/Mercury";
import Venus from "./celestial-bodies/Venus";
import Earth from "./celestial-bodies/earth/Earth";
import Mars from "./celestial-bodies/Mars";
import Jupiter from "./celestial-bodies/jupiter/Jupiter";
import Saturn from "./celestial-bodies/saturn/Saturn";
import Uranus from "./celestial-bodies/Uranus";
import Neptune from "./celestial-bodies/neptune/Neptune";
import Pluto from "./celestial-bodies/Pluto";

import "./TheSystem.scss";
import "./celestial-bodies/Planets.scss";

const systemStyle = systemRadius => ({
    height: `${2 * systemRadius}px`,
    width: `${2 * systemRadius}px`
});

class TheSystem extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { pointsOfInterest } = this.props;
        return (
            <SystemContext.Provider value={defaultContext}>
                <SystemContext.Consumer>
                    {context => (
                        <div className="the-system" style={systemStyle(context.systemRadius)}>
                            <Pluto scrollToRef={pointsOfInterest.pluto.ref} />
                            <Neptune scrollToRef={pointsOfInterest.neptune.ref} />
                            <Uranus scrollToRef={pointsOfInterest.uranus.ref} />
                            <Jupiter scrollToRef={pointsOfInterest.jupiter.ref} />
                            <Saturn scrollToRef={pointsOfInterest.saturn.ref} />
                            <TheBelt />
                            <Mars scrollToRef={pointsOfInterest.mars.ref} />
                            <Earth scrollToRef={pointsOfInterest.earth.ref} />
                            <Venus scrollToRef={pointsOfInterest.venus.ref} />
                            <Mercury scrollToRef={pointsOfInterest.mercury.ref} />
                            <Sun scrollToRef={pointsOfInterest.sun.ref} />
                        </div>
                    )}
                </SystemContext.Consumer>
            </SystemContext.Provider>
        );
    }
}

TheSystem.propTypes = {
    pointsOfInterest: PropTypes.shape({
        pluto: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        neptune: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        uranus: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        jupiter: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        saturn: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        mars: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        earth: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        venus: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        mercury: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        sun: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ])
    }).isRequired
};

export default TheSystem;

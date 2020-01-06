import React, { useContext, CSSProperties, ReactElement } from "react";
import PropTypes from "prop-types";
import AppContext from "../../SystemContext";
import Sun from "./celestial-bodies/Sun";
import TheBelt from "./ the-belt/TheBelt";
import Earth from "./celestial-bodies/earth/Earth";
import Jupiter from "./celestial-bodies/jupiter/Jupiter";
import Saturn from "./celestial-bodies/saturn/Saturn";
import Neptune from "./celestial-bodies/neptune/Neptune";
import Planet from "./celestial-bodies/bodies/Planet";
import { PlutoConsts } from "../../SharedConsts";

import "./TheSystem.scss";
import { PointsOfInterest } from "../../App";

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

function systemStyle(systemRadius: number): CSSProperties {
    return {
        height: `${2 * systemRadius}px`,
        width: `${2 * systemRadius}px`
    };
}

interface Props {
    pointsOfInterest: PointsOfInterest;
}

function TheSystem(props: Props): ReactElement {
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
    } = props.pointsOfInterest;
    const { systemRadius } = useContext(AppContext);

    return (
        <div className="the-system" style={systemStyle(systemRadius)}>
            <div className="the-system-suns-glow" style={systemStyle(systemRadius)}>
                <Planet name={"pluto"} planetConstants={PlutoConsts} scrollToRef={pluto.ref} />
                <Neptune scrollToRef={neptune.ref} />
                <Planet name={"uranus"} planetConstants={UranusConsts} scrollToRef={uranus.ref} />
                <Jupiter scrollToRef={jupiter.ref} />
                <Saturn scrollToRef={saturn.ref} />
                <TheBelt scrollToRef={theBelt.ref} />
                <Planet name={"mars"} planetConstants={MarsConsts} scrollToRef={mars.ref} />
                <Earth scrollToRef={earth.ref} />
                <Planet name={"venus"} planetConstants={VenusConsts} scrollToRef={venus.ref} />
                <Planet
                    name={"mercury"}
                    planetConstants={MercuryConsts}
                    scrollToRef={mercury.ref}
                />
                <Sun scrollToRef={sun.ref} />
            </div>
        </div>
    );
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
        saturn: refShape,
        jupiter: refShape,
        theBelt: refShape,
        mars: refShape,
        earth: refShape,
        venus: refShape,
        mercury: refShape,
        sun: refShape
    }).isRequired
};

export default React.memo(TheSystem);

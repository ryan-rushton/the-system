import React from "react";
import TheStars from "./TheStars";
import Sun from "./celestial-bodies/Sun";
import TheBelt from "./ the-belt/TheBelt";
import Mercury from "./celestial-bodies/Mercury";
import Venus from "./celestial-bodies/Venus";
import Earth from "./celestial-bodies/earth/Earth";
import Mars from "./celestial-bodies/Mars";
import Jupiter from "./celestial-bodies/Jupiter";
import Saturn from "./celestial-bodies/saturn/Saturn";
import Uranus from "./celestial-bodies/Uranus";
import Neptune from "./celestial-bodies/Neptune";
import Pluto from "./celestial-bodies/Pluto";
import { SunConsts, PlutoConsts } from "./celestial-bodies/CelestialBodiesConstants";

import "./TheSystem.scss";

const EDGE_BUFFER = 250;
const STAR_COUNT = 12000;

const multipliers = {
    sizeMultiplier: 0.001,
    sunSizeMultiplier: 0.0004,
    orbitalPeriodMultiplier: 0.3,
    distanceMultiplier: 0.0000025
};

const systemRadius =
    multipliers.distanceMultiplier * PlutoConsts.distance +
    2 * multipliers.sizeMultiplier * PlutoConsts.radius +
    multipliers.sunSizeMultiplier * SunConsts.radius +
    EDGE_BUFFER;

const systemStyle = {
    height: `${2 * systemRadius}px`,
    width: `${2 * systemRadius}px`
};

const getInitialScrollPoint = () => {
    const windowWidth = window.innerWidth || document.body.clientWidth;
    const windowHeight = window.innerHeight || document.body.clientHeight;
    return {
        x: systemRadius - windowWidth / 2,
        y: systemRadius - windowHeight / 2
    };
};

class TheSystem extends React.Component {
    componentDidMount() {
        const initialScrollPoint = getInitialScrollPoint();
        window.scrollTo(initialScrollPoint.x, initialScrollPoint.y);
    }

    render() {
        return (
            <div className="the-system" style={systemStyle}>
                <TheStars starCount={STAR_COUNT} systemRadius={systemRadius} />
                <TheBelt multipliers={multipliers} systemRadius={systemRadius} />
                <Sun multipliers={multipliers} systemRadius={systemRadius} />
                <Mercury multipliers={multipliers} systemRadius={systemRadius} />
                <Venus multipliers={multipliers} systemRadius={systemRadius} />
                <Earth multipliers={multipliers} systemRadius={systemRadius} />
                <Mars multipliers={multipliers} systemRadius={systemRadius} />
                <Jupiter multipliers={multipliers} systemRadius={systemRadius} />
                <Saturn multipliers={multipliers} systemRadius={systemRadius} />
                <Uranus multipliers={multipliers} systemRadius={systemRadius} />
                <Neptune multipliers={multipliers} systemRadius={systemRadius} />
                <Pluto multipliers={multipliers} systemRadius={systemRadius} />
            </div>
        );
    }
}

export default TheSystem;

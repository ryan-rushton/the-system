import React from "react";
import "./TheSystem.css";
import Star from "./Star";
import Sun from "./celestial-bodies/Sun";
import TheBelt from "./ the-belt/TheBelt";
import Mercury from "./celestial-bodies/Mercury";
import Venus from "./celestial-bodies/Venus";
import Earth from "./celestial-bodies/Earth";
import Mars from "./celestial-bodies/Mars";
import Jupiter from "./celestial-bodies/Jupiter";
import Saturn from "./celestial-bodies/saturn/Saturn";
import Uranus from "./celestial-bodies/Uranus";
import Neptune from "./celestial-bodies/Neptune";
import Pluto from "./celestial-bodies/Pluto";
import {
    SunConsts,
    PlutoConsts
} from "./celestial-bodies/CelestialBodiesConstants";

const EDGE_BUFFER = 100;
const STAR_COUNT = 3000;

const multipliers = {
    sizeMultiplier: 0.0005,
    sunSizeMultiplier: 0.0005,
    orbitalPeriodMultiplier: 0.3,
    distanceMultiplier: 0.000005
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

const renderStars = () => {
    const stars = [];
    let vals = {};

    for (let i = 0; i < STAR_COUNT; i += 1) {
        vals = {
            x: 2 * systemRadius * Math.random(),
            y: 2 * systemRadius * Math.random(),
            luminosity: Math.random(),
            size: 2 * Math.random()
        };
        stars.push(<Star {...vals} key={`star-${i}`} />);
    }

    return stars;
};

class TheSystem extends React.Component {
    componentDidMount() {
        const initialScrollPoint = getInitialScrollPoint();
        window.scrollTo(initialScrollPoint.x, initialScrollPoint.y);
    }

    render() {
        return (
            <div className="the-system" style={systemStyle}>
                <div className="the-stars">{renderStars()}</div>
                <TheBelt
                    multipliers={multipliers}
                    systemRadius={systemRadius}
                />
                <Sun multipliers={multipliers} systemRadius={systemRadius} />
                <Mercury
                    multipliers={multipliers}
                    systemRadius={systemRadius}
                />
                <Venus multipliers={multipliers} systemRadius={systemRadius} />
                <Earth multipliers={multipliers} systemRadius={systemRadius} />
                <Mars multipliers={multipliers} systemRadius={systemRadius} />
                <Jupiter
                    multipliers={multipliers}
                    systemRadius={systemRadius}
                />
                <Saturn multipliers={multipliers} systemRadius={systemRadius} />
                <Uranus multipliers={multipliers} systemRadius={systemRadius} />
                <Neptune
                    multipliers={multipliers}
                    systemRadius={systemRadius}
                />
                <Pluto multipliers={multipliers} systemRadius={systemRadius} />
            </div>
        );
    }
}

export default TheSystem;

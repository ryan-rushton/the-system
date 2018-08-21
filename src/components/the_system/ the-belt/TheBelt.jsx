import React from "react";
import PropTypes from "prop-types";
import {
    SunConsts,
    MarsConsts,
    JupiterConsts
} from "../celestial-bodies/CelestialBodiesConstants";

import "./TheBelt.css";

const ROCK_COUNT = 2500;

const BeltRock = ({ x, y, luminosity, size, beltRadius }) => {
    const style = {
        backgroundColor: "rgb(210, 210, 210)",
        height: size,
        left: `calc(${beltRadius}px + ${x}px)`,
        opacity: luminosity,
        position: "absolute",
        top: `calc(${beltRadius}px + ${y}px)`,
        width: size
    };
    return <div className="belt-rock" style={style} />;
};

BeltRock.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    luminosity: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    beltRadius: PropTypes.number.isRequired
};

class TheBelt extends React.Component {
    constructor(props) {
        super(props);
        const { multipliers } = props;
        const outerMars =
            MarsConsts.distance * multipliers.distanceMultiplier +
            SunConsts.radius * multipliers.sunSizeMultiplier +
            MarsConsts.radius * multipliers.sizeMultiplier;
        const innerJupiter =
            JupiterConsts.distance * multipliers.distanceMultiplier +
            SunConsts.radius * multipliers.sunSizeMultiplier -
            JupiterConsts.radius * multipliers.sizeMultiplier;

        this.innerBelt = outerMars + (innerJupiter - outerMars) * 0.1;
        this.outerBelt = outerMars + (innerJupiter - outerMars) * 0.7;
        this.beltSize = this.outerBelt - this.innerBelt;
    }

    renderBelt() {
        const rocks = [];

        for (let i = 0; i < ROCK_COUNT; i += 1) {
            const distance =
                this.innerBelt +
                this.beltSize * Math.sin(Math.PI * Math.random());
            const theta = Math.random() * 360;
            const vals = {
                x: distance * Math.cos(theta),
                y: distance * -Math.sin(theta),
                luminosity: Math.min(Math.random(), 0.5),
                size: 2 * Math.random(),
                beltRadius: this.outerBelt
            };
            rocks.push(<BeltRock {...vals} key={`belt-rock-${i}`} />);
        }

        return rocks;
    }

    render() {
        const { systemRadius } = this.props;
        const style = {
            height: this.outerBelt * 2,
            left: `calc(${systemRadius}px - ${this.outerBelt}px)`,
            position: "absolute",
            top: `calc(${systemRadius}px - ${this.outerBelt}px)`,
            width: this.outerBelt * 2
        };
        return (
            <div className="the-belt" style={style}>
                {this.renderBelt()}
            </div>
        );
    }
}

TheBelt.propTypes = {
    multipliers: PropTypes.objectOf(PropTypes.number).isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default TheBelt;

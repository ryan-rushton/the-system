import React from "react";
import PropTypes from "prop-types";
import SystemContext from "../../../SystemContext";
import { SunConsts } from "../../../SharedConsts";
import { MarsConsts } from "../TheSystem";
import { JupiterConsts } from "../celestial-bodies/jupiter/Jupiter";

import "./TheBelt.scss";

const ROCK_COUNT = 15000;

const BeltRock = ({ x, y, luminosity, size, beltRadius }) => {
    const left = beltRadius + x;
    const top = beltRadius + y;
    const style = {
        backgroundColor: "rgb(210, 210, 210)",
        height: size,
        left: `${left}px`,
        opacity: luminosity,
        position: "absolute",
        top: `${top}px`,
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
    constructor(props, context) {
        super(props);
        const { multipliers } = context;
        const { distanceMultiplier, sizeMultiplier } = multipliers;
        const outerMars =
            MarsConsts.distance * distanceMultiplier +
            SunConsts.radius * sizeMultiplier +
            MarsConsts.radius * sizeMultiplier;
        const innerJupiter =
            JupiterConsts.distance * distanceMultiplier +
            SunConsts.radius * sizeMultiplier -
            JupiterConsts.radius * sizeMultiplier;

        this.innerBelt = outerMars + (innerJupiter - outerMars) * 0.1;
        this.outerBelt = outerMars + (innerJupiter - outerMars) * 0.7;
        this.beltSize = this.outerBelt - this.innerBelt;
    }

    shouldComponentUpdate() {
        return false;
    }

    renderBelt() {
        const rocks = [];

        for (let i = 0; i < ROCK_COUNT / 2; i += 1) {
            const distance = this.innerBelt + this.beltSize * Math.sin(Math.PI * Math.random());
            const theta = Math.random() * 360;
            const vals = {
                x: distance * Math.cos(theta),
                y: distance * -Math.sin(theta),
                luminosity: 0.5 * (1 + Math.random()),
                size: 2 * Math.random(),
                beltRadius: this.outerBelt
            };
            rocks.push(<BeltRock {...vals} key={`belt-rock-${i}`} />);
        }

        return rocks;
    }

    render() {
        const { systemRadius } = this.context;
        const style = {
            height: this.outerBelt * 2,
            left: `calc(${systemRadius}px - ${this.outerBelt}px)`,
            top: `calc(${systemRadius}px - ${this.outerBelt}px)`,
            width: this.outerBelt * 2
        };

        return (
            <div className="the-belt">
                <div className="the-belt-1st-layer" style={style}>
                    {this.renderBelt()}
                </div>
                <div className="the-belt-2nd-layer" style={style}>
                    {this.renderBelt()}
                </div>
            </div>
        );
    }
}

TheBelt.contextType = SystemContext;

export default TheBelt;

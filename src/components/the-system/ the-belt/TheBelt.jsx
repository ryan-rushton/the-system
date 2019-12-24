import React from "react";
import PropTypes from "prop-types";
import SystemContext from "../../../SystemContext";
import { SunConsts } from "../../../SharedConsts";
import { MarsConsts } from "../TheSystem";
import { JupiterConsts } from "../celestial-bodies/jupiter/Jupiter";

import "./TheBelt.scss";

const ROCK_COUNT = 15000;

const BeltRock = ({ x, y, luminosity, size, beltRadius, scrollToRef }) => {
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

    return <div className="belt-rock" style={style} ref={scrollToRef} />;
};

BeltRock.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    luminosity: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    beltRadius: PropTypes.number.isRequired,
    scrollToRef: PropTypes.shape({})
};

const renderBelt = (innerBelt, outerBelt, beltSize, scrollToRef) => {
    const rocks = [];

    for (let i = 0; i < ROCK_COUNT / 2; i += 1) {
        const distance = innerBelt + beltSize * Math.sin(Math.PI * Math.random());
        const theta = Math.random() * 360;
        const values = {
            x: distance * Math.cos(theta),
            y: distance * -Math.sin(theta),
            luminosity: 0.5 * (1 + Math.random()),
            size: 1 + Math.random(),
            beltRadius: outerBelt
        };
        rocks.push(<BeltRock {...values} key={`belt-rock-${i}`} />);
    }

    if (scrollToRef) {
        const values = {
            x: innerBelt,
            y: innerBelt,
            luminosity: 0.5 * (1 + Math.random()),
            size: 1 + Math.random(),
            beltRadius: outerBelt,
            scrollToRef: scrollToRef
        };
        rocks.push(<BeltRock {...values} key="belt-ref" />);
    }

    return rocks;
};

class TheBelt extends React.Component {
    constructor(props, context) {
        super(props);
        // TODO: optimise this further by moving the belt caching to HOC
        this.beltCache = new Map();
    }

    // We set this to false as a context change will force a re-render and thats the only time it should re-render.
    shouldComponentUpdate() {
        return false;
    }

    getBeltSize(multipliers) {
        const { distanceMultiplier, sizeMultiplier } = multipliers;
        const outerMars =
            MarsConsts.distance * distanceMultiplier +
            SunConsts.radius * sizeMultiplier +
            MarsConsts.radius * sizeMultiplier;
        const innerJupiter =
            JupiterConsts.distance * distanceMultiplier +
            SunConsts.radius * sizeMultiplier -
            JupiterConsts.radius * sizeMultiplier;

        const innerBelt = outerMars + (innerJupiter - outerMars) * 0.1;
        const outerBelt = outerMars + (innerJupiter - outerMars) * 0.7;
        const beltSize = outerBelt - innerBelt;

        return { innerBelt, outerBelt, beltSize };
    }

    getBeltStyle(innerBelt, outerBelt, isFirstLayer) {
        const { multipliers, systemRadius } = this.context;
        const baseOrbitalPeriod = isFirstLayer
            ? MarsConsts.orbitalPeriod
            : Math.floor(MarsConsts.orbitalPeriod / 100) * 100;
        const orbitalPeriod = baseOrbitalPeriod * multipliers.orbitalPeriodMultiplier;
        return {
            animation: `orbit ${orbitalPeriod}s linear infinite`,
            height: outerBelt * 2,
            left: `calc(${systemRadius}px - ${outerBelt}px)`,
            top: `calc(${systemRadius}px - ${outerBelt}px)`,
            width: outerBelt * 2
        };
    }

    memoizedRenderBelt(innerBelt, outerBelt, beltSize, scrollToRef) {
        const start = performance.now();
        const refStatus = scrollToRef ? "hasRef" : "noRef";
        const key = `${innerBelt}-${outerBelt}-${beltSize}-${refStatus}`;

        if (!this.beltCache.has(key)) {
            const result = renderBelt(innerBelt, outerBelt, beltSize, scrollToRef);
            this.beltCache.set(key, result);
        }

        const end = performance.now();
        console.info(`Belt render took ${end - start}ms`);

        return this.beltCache.get(key);
    }

    render() {
        const { scrollToRef } = this.props;
        const { multipliers } = this.context;
        const { innerBelt, outerBelt, beltSize } = this.getBeltSize(multipliers);

        return (
            <div className="the-belt">
                <div
                    className="the-belt-layer"
                    style={this.getBeltStyle(innerBelt, outerBelt, true)}
                >
                    {this.memoizedRenderBelt(innerBelt, outerBelt, beltSize, scrollToRef)}
                </div>
                <div className="the-belt-layer" style={this.getBeltStyle(innerBelt, outerBelt)}>
                    {this.memoizedRenderBelt(innerBelt, outerBelt, beltSize)}
                </div>
            </div>
        );
    }
}

TheBelt.propTypes = {
    scrollToRef: PropTypes.shape({})
};

TheBelt.contextType = SystemContext;

export default TheBelt;

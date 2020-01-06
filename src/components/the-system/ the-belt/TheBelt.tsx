import React, { RefObject, ReactElement, CSSProperties, ReactNode } from "react";
import AppContext, { SystemMultipliers } from "../../../SystemContext";
import { SunConsts } from "../../../SharedConsts";
import { MarsConsts } from "../TheSystem";
import { JupiterConsts } from "../celestial-bodies/jupiter/Jupiter";

import "./TheBelt.scss";

const ROCK_COUNT = 15000;

interface BeltRockProps {
    x: number;
    y: number;
    luminosity: number;
    size: number;
    beltRadius: number;
    scrollToRef?: RefObject<HTMLDivElement>;
}

function BeltRock(props: BeltRockProps): ReactElement {
    const { x, y, luminosity, size, beltRadius, scrollToRef } = props;
    const left = beltRadius + x;
    const top = beltRadius + y;
    const style: CSSProperties = {
        backgroundColor: "rgb(210, 210, 210)",
        height: size,
        left: `${left}px`,
        opacity: luminosity,
        position: "absolute",
        top: `${top}px`,
        width: size
    };

    return <div className="belt-rock" style={style} ref={scrollToRef} />;
}

interface BeltProperties {
    innerBelt: number;
    outerBelt: number;
    beltSize: number;
}

interface Props {
    scrollToRef: RefObject<HTMLDivElement>;
}

class TheBelt extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        // TODO: optimise this further by moving the belt caching to HOC
        this.beltCache = new Map();
    }

    beltCache: Map<string, ReactElement[]>;

    // We set this to false as a context change will force a re-render and thats the only time it should re-render.
    shouldComponentUpdate(): boolean {
        return false;
    }

    getBeltSize(multipliers: SystemMultipliers): BeltProperties {
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

    getBeltStyle(innerBelt: number, outerBelt: number, isFirstLayer: boolean): CSSProperties {
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

    renderBelt(
        { innerBelt, outerBelt, beltSize }: BeltProperties,
        scrollToRef: RefObject<HTMLDivElement> | null
    ): ReactElement[] {
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
    }

    memoizedRenderBelt(
        beltProperties: BeltProperties,
        scrollToRef: RefObject<HTMLDivElement> | null
    ): ReactNode {
        const start = performance.now();
        const { innerBelt, outerBelt, beltSize } = beltProperties;
        const refStatus = scrollToRef ? "hasRef" : "noRef";
        const key = `${innerBelt}-${outerBelt}-${beltSize}-${refStatus}`;

        if (!this.beltCache.has(key)) {
            const result = this.renderBelt(beltProperties, scrollToRef);
            this.beltCache.set(key, result);
        }

        const end = performance.now();
        console.info(`Belt render took ${end - start}ms`);

        return this.beltCache.get(key);
    }

    render(): ReactElement {
        const { scrollToRef } = this.props;
        const { multipliers } = this.context;
        const beltProperties = this.getBeltSize(multipliers);
        const { innerBelt, outerBelt } = beltProperties;

        return (
            <div className="the-belt">
                <div
                    className="the-belt-layer"
                    style={this.getBeltStyle(innerBelt, outerBelt, true)}
                >
                    {this.memoizedRenderBelt(beltProperties, scrollToRef)}
                </div>
                <div
                    className="the-belt-layer"
                    style={this.getBeltStyle(innerBelt, outerBelt, false)}
                >
                    {this.memoizedRenderBelt(beltProperties, null)}
                </div>
            </div>
        );
    }
}

TheBelt.contextType = AppContext;

export default TheBelt;

import React, { RefObject, CSSProperties, ReactNode } from "react";
import AppContext from "../../../../SystemContext";
import styles from "./CelestialBody.module.scss";
import "./CelestialBodyAnimations.scss";

export interface CelestialBodyProps {
    className: string;
    distance: number;
    orbitalPeriod: number;
    radius: number;
    hasOrbitLine?: boolean;
    planetRadius?: number;
    satellites?: CelestialBodyProps[];
    scrollToRef?: RefObject<HTMLDivElement>;
}

class CelestialBody extends React.Component<CelestialBodyProps> {
    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    getCssValuesForOrbits(): CSSProperties {
        const { systemRadius } = this.context;
        const { radius, orbitalPeriod, distance, planetRadius } = this.props;
        const referencePoint = planetRadius ? 0 : systemRadius;
        const referencePointRadius = planetRadius || 0;
        const center = referencePoint - distance - radius;
        const heightWidth = 2 * (distance + radius + referencePointRadius);

        return {
            animation: `orbit ${orbitalPeriod}s linear infinite`,
            height: `${heightWidth}px`,
            left: `${center}px`,
            top: `${center}px`,
            width: `${heightWidth}px`,
        };
    }

    getCssValuesForBody(): CSSProperties {
        const { radius, orbitalPeriod, distance } = this.props;
        // Assume something with distance 0 (this sun) is already centered
        const top = distance > 0 ? "50%" : 0;
        const left = distance > 0 ? `${-radius}px` : 0;

        return {
            animation: `planet-rotation ${orbitalPeriod}s linear infinite`,
            height: `${radius * 2}px`,
            left,
            top,
            width: `${radius * 2}px`,
        };
    }

    render(): ReactNode {
        const { className, hasOrbitLine, satellites, scrollToRef } = this.props;
        const orbitLineClass = hasOrbitLine ? " orbit-line" : "";

        return (
            <div
                className={`${styles.orbit}${orbitLineClass}`}
                style={this.getCssValuesForOrbits()}
            >
                <div
                    className={`${styles.celestialBody} ${className}`}
                    title={className}
                    ref={scrollToRef}
                    style={this.getCssValuesForBody()}
                >
                    {satellites?.map((satellite: CelestialBodyProps) => (
                        <CelestialBody key={`satellite-${satellite.className}`} {...satellite} />
                    ))}
                </div>
            </div>
        );
    }
}

export default CelestialBody;

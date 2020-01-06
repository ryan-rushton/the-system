import React, { ReactElement, RefObject, CSSProperties, ReactNode } from "react";
import AppContext from "../../../../SystemContext";
import "./CelestialBody.scss";

export interface CelestialBodyProps {
    className: string;
    distance: number;
    orbitalPeriod: number;
    radius: number;
    planetRadius?: number;
    satellites?: CelestialBodyProps[];
    scrollToRef?: RefObject<HTMLDivElement>;
}

class CelestialBody extends React.Component<CelestialBodyProps> {
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
            width: `${heightWidth}px`
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
            width: `${radius * 2}px`
        };
    }

    renderSatellites(): ReactNode {
        const { satellites } = this.props;
        return satellites?.map((satellite: CelestialBodyProps) => (
            <CelestialBody key={`satellite-${satellite.className}`} {...satellite} />
        ));
    }

    render(): ReactElement {
        const { className, scrollToRef } = this.props;

        return (
            <div className={`orbit ${className}-orbit`} style={this.getCssValuesForOrbits()}>
                <div
                    className={`celestial-body ${className}`}
                    title={className}
                    ref={scrollToRef}
                    style={this.getCssValuesForBody()}
                >
                    {this.renderSatellites()}
                </div>
            </div>
        );
    }
}

CelestialBody.contextType = AppContext;

export default CelestialBody;

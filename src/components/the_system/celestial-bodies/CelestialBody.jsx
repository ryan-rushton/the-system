import React from "react";
import PropTypes from "prop-types";
import "./CelestialBody.css";

const UPDATE_INTERVAL = 200; // this is in ms
const MS_PER_MIN = 60000;

class CelestialBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            theta: Math.PI
        };
    }

    componentDidMount() {
        const { distance } = this.props;

        if (distance) {
            this.interval = setInterval(
                this.updateThetaInState.bind(this),
                UPDATE_INTERVAL
            );
        }
    }

    componentWillUnmount() {
        const { distance } = this.props;

        if (distance) {
            clearInterval(this.interval);
        }
    }

    getCssValues() {
        const { radius, systemRadius } = this.props;
        const position = this.getPosition();

        return {
            height: `${radius * 2}px`,
            left: `calc(${systemRadius}px + ${position.x}px - ${radius}px)`,
            top: `calc(${systemRadius}px + ${position.y}px - ${radius}px)`,
            transitionDuration: `${UPDATE_INTERVAL / 1000}s`,
            width: `${radius * 2}px`
        };
    }

    getPosition() {
        const { theta, position } = this.state;
        if (!(theta === undefined)) {
            return this.getCoordinates();
        }

        return position;
    }

    getCoordinates() {
        const { distance } = this.props;
        const { theta } = this.state;
        return {
            x: distance * Math.cos(theta),
            y: distance * -Math.sin(theta)
        };
    }

    updateThetaInState() {
        this.setState(oldState => ({
            theta: this.updateTheta(oldState.theta)
        }));
    }

    updateTheta(theta) {
        if (!document.hidden) {
            const { radiansPerMinute } = this.props;
            const extraRadians =
                radiansPerMinute * (UPDATE_INTERVAL / MS_PER_MIN);
            const newTheta = theta + extraRadians;
            return newTheta % (2 * Math.PI);
        }

        return theta;
    }

    render() {
        const { additionalClassNames } = this.props;
        const classNames = ["celestial-body"].concat(additionalClassNames);
        const className = classNames.join(" ");

        return <div className={className} style={this.getCssValues()} />;
    }
}

CelestialBody.propTypes = {
    additionalClassNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    distance: PropTypes.number.isRequired,
    radiansPerMinute: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    systemRadius: PropTypes.number.isRequired
};

export default CelestialBody;

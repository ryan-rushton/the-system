import React from "react";
import NavMenu from "./components/nav_menu/NavMenu";
import TheSystem from "./components/the_system/TheSystem";
import "./App.scss";

const pointsOfInterest = {
    sun: {
        ref: React.createRef(),
        display: "Sun"
    },
    mercury: {
        ref: React.createRef(),
        display: "Mercury"
    },
    venus: {
        ref: React.createRef(),
        display: "Venus"
    },
    earth: {
        ref: React.createRef(),
        display: "Earth"
    },
    mars: {
        ref: React.createRef(),
        display: "Mars"
    },
    jupiter: {
        ref: React.createRef(),
        display: "Jupiter"
    },
    saturn: {
        ref: React.createRef(),
        display: "Saturn"
    },
    uranus: {
        ref: React.createRef(),
        display: "Uranus"
    },
    neptune: {
        ref: React.createRef(),
        display: "Neptune"
    },
    pluto: {
        ref: React.createRef(),
        display: "Pluto"
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { renderSystem: false };
        this.startTheSystemRender = this.startTheSystemRender.bind(this);
    }

    componentDidMount() {
        window.setTimeout(this.startTheSystemRender, 200);
    }

    startTheSystemRender() {
        this.setState({ renderSystem: true });
    }

    renderTheSystem() {
        return <TheSystem pointsOfInterest={pointsOfInterest} />;
    }

    renderLoading() {
        return <div className="the-system-is-loading-bg" />;
    }

    render() {
        const { renderSystem } = this.state;
        const content = renderSystem ? this.renderTheSystem() : this.renderLoading();
        const loadingClassName = renderSystem ? "is-hidden" : null;
        return (
            <div>
                <div className="the-system-app-title">
                    <span>The System</span>
                    <span className={loadingClassName}> is loading</span>
                </div>
                <NavMenu pointsOfInterest={pointsOfInterest} />
                {content}
            </div>
        );
    }
}

export default App;

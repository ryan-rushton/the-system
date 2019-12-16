import React from "react";
import SystemContext, { systemSize } from "./SystemContext";
import NavMenu from "./components/nav-menu/NavMenu";
import TheSystem from "./components/the-system/TheSystem";
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
    theBelt: {
        ref: React.createRef(),
        display: "The Belt"
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
        this.state = { systemSizeContext: systemSize.enhancedVisibility };
    }

    toggleSystemSize = systemSizeContext => this.setState({ systemSizeContext });

    render() {
        return (
            <SystemContext.Provider value={this.state.systemSizeContext}>
                <div>
                    <div className="the-system-app-title">
                        <span>The System</span>
                    </div>
                    <NavMenu
                        pointsOfInterest={pointsOfInterest}
                        toggleSystemSize={this.toggleSystemSize}
                    />
                    <TheSystem pointsOfInterest={pointsOfInterest} />
                </div>
            </SystemContext.Provider>
        );
    }
}

export default App;

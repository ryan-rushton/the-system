import React from "react";
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

const App = () => (
    <div>
        <div className="the-system-app-title">
            <span>The System</span>
        </div>
        <NavMenu pointsOfInterest={pointsOfInterest} />
        <TheSystem pointsOfInterest={pointsOfInterest} />
    </div>
);

export default App;

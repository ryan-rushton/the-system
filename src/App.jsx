import React from "react";
import TheSystem from "./components/the_system/TheSystem";
import "./App.css";

const title = () => <div className="the-system-app-title">The System</div>;

const App = () => (
    <div>
        {title()}
        <TheSystem />
    </div>
);

export default App;

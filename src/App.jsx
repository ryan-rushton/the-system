import React from "react";
import NavMenu from "./components/nav_menu/NavMenu";
import TheSystem from "./components/the_system/TheSystem";
import "./App.scss";

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
        return <TheSystem />;
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
                <NavMenu />
                {content}
            </div>
        );
    }
}

export default App;

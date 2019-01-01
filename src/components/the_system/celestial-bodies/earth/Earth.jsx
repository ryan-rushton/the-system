import React from "react";
import Planet from "../planet/Planet";

const earthConsts = {
    radius: 6378,
    distance: 149600000,
    orbitalPeriod: 365.2
};

const moon = {
    className: "moon",
    distance: 384400,
    orbitalPeriod: 27.3,
    radius: 1737
};

const Earth = () => {
    const name = "earth";

    return <Planet name={name} planetConstants={earthConsts} moons={[moon]} />;
};

export default Earth;

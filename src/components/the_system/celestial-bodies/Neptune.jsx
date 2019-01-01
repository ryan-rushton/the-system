import React from "react";
import Planet from "./planet/Planet";

const NeptuneConsts = {
    radius: 24764,
    distance: 4495100000,
    orbitalPeriod: 59800
};

const Neptune = () => {
    const name = "neptune";

    return <Planet name={name} planetConstants={NeptuneConsts} />;
};

export default Neptune;

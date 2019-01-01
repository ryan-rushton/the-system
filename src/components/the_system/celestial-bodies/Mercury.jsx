import React from "react";
import Planet from "./planet/Planet";

const MercuryConsts = {
    radius: 2440,
    distance: 57900000,
    orbitalPeriod: 88
};

const Mercury = () => {
    const name = "mercury";

    return <Planet name={name} planetConstants={MercuryConsts} />;
};

export default Mercury;

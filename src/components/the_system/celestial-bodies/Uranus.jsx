import React from "react";
import Planet from "./planet/Planet";

const UranusConsts = {
    radius: 25559,
    distance: 2872500000,
    orbitalPeriod: 30589
};

const Uranus = () => {
    const name = "uranus";

    return <Planet name={name} planetConstants={UranusConsts} />;
};

export default Uranus;

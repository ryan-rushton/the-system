import React from "react";
import Planet from "./planet/Planet";

const VenusConsts = {
    radius: 6052,
    distance: 108200000,
    orbitalPeriod: 224.7
};

const Venus = () => {
    const name = "venus";

    return <Planet name={name} planetConstants={VenusConsts} />;
};

export default Venus;

import React from "react";
import Planet from "./planet/Planet";

export const MarsConsts = {
    radius: 3396,
    distance: 227900000,
    orbitalPeriod: 687
};

const Mars = () => {
    const name = "mars";

    return <Planet name={name} planetConstants={MarsConsts} />;
};

export default Mars;

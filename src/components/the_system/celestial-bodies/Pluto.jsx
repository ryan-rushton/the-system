import React from "react";
import { PlutoConsts } from "../SharedConsts";
import Planet from "./planet/Planet";

const Pluto = () => {
    const name = "pluto";

    return <Planet name={name} planetConstants={PlutoConsts} />;
};

export default Pluto;

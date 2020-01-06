import React, { RefObject, ReactElement } from "react";
import Planet from "../bodies/Planet";

import "./Neptune.scss";

const NeptuneConsts = {
    radius: 24764,
    distance: 4495100000,
    orbitalPeriod: 59800
};

interface Props {
    scrollToRef: RefObject<HTMLDivElement>;
}

const Neptune = ({ scrollToRef }: Props): ReactElement => (
    <Planet name="neptune" planetConstants={NeptuneConsts} scrollToRef={scrollToRef} />
);

export default Neptune;

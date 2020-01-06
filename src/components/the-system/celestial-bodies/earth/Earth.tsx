import React, { RefObject, ReactElement } from "react";
import Planet from "../bodies/Planet";

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

interface Props {
    scrollToRef: RefObject<HTMLDivElement>;
}

const Earth = ({ scrollToRef }: Props): ReactElement => (
    <Planet name="earth" planetConstants={earthConsts} moons={[moon]} scrollToRef={scrollToRef} />
);

export default Earth;

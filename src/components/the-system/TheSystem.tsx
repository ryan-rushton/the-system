import React, { useContext, CSSProperties, FC } from "react";
import AppContext from "../../SystemContext";
import Sun from "./celestial-bodies/sun/Sun";
import TheBelt from "./ the-belt/TheBelt";
import Earth from "./celestial-bodies/earth/Earth";
import Jupiter from "./celestial-bodies/jupiter/Jupiter";
import Saturn from "./celestial-bodies/saturn/Saturn";
import Neptune from "./celestial-bodies/neptune/Neptune";
import Planet from "./celestial-bodies/bodies/Planet";
import { PlutoConsts } from "../../SharedConsts";
import styles from "./TheSystem.module.scss";
import { PointsOfInterest } from "../../App";

const MercuryConsts = {
    radius: 2440,
    distance: 57900000,
    orbitalPeriod: 88,
};

const VenusConsts = {
    radius: 6052,
    distance: 108200000,
    orbitalPeriod: 224.7,
};

export const MarsConsts = {
    radius: 3396,
    distance: 227900000,
    orbitalPeriod: 687,
};

const UranusConsts = {
    radius: 25559,
    distance: 2872500000,
    orbitalPeriod: 30589,
};

const getSystemDimensions = (systemRadius: number): CSSProperties => {
    return {
        height: `${2 * systemRadius}px`,
        width: `${2 * systemRadius}px`,
    };
};

interface Props {
    pointsOfInterest: PointsOfInterest;
}

const TheSystem: FC<Props> = (props) => {
    const {
        sun,
        mercury,
        venus,
        earth,
        mars,
        theBelt,
        jupiter,
        saturn,
        uranus,
        neptune,
        pluto,
    } = props.pointsOfInterest;
    const { systemRadius } = useContext(AppContext);

    return (
        <div className={styles.theSystem} style={getSystemDimensions(systemRadius)}>
            <div className={styles.sunsGlow} style={getSystemDimensions(systemRadius)}>
                <Planet name={styles.pluto} planetConstants={PlutoConsts} scrollToRef={pluto.ref} />
                <Neptune scrollToRef={neptune.ref} />
                <Planet
                    name={styles.uranus}
                    planetConstants={UranusConsts}
                    scrollToRef={uranus.ref}
                />
                <Jupiter scrollToRef={jupiter.ref} />
                <Saturn scrollToRef={saturn.ref} />
                <TheBelt scrollToRef={theBelt.ref} />
                <Planet name={styles.mars} planetConstants={MarsConsts} scrollToRef={mars.ref} />
                <Earth scrollToRef={earth.ref} />
                <Planet name={styles.venus} planetConstants={VenusConsts} scrollToRef={venus.ref} />
                <Planet
                    name={styles.mercury}
                    planetConstants={MercuryConsts}
                    scrollToRef={mercury.ref}
                />
                <Sun scrollToRef={sun.ref} />
            </div>
        </div>
    );
};

export default React.memo(TheSystem);

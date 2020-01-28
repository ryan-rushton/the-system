import React from "react";
import { PointsOfInterest, PointOfInterest } from "../../../App";
import { getOnEnterPress } from "../../../utils/EventUtils";
import styles from "./PointsOfInterestMenu.module.scss";
import commonStyles from "../CommonStyles.module.scss";

interface Props {
    pointsOfInterest: PointsOfInterest;
    followedPoi: PointOfInterest | null;
    onPoiClick(poi: PointOfInterest): void;
}

const PointsOfInterestMenu = ({
    pointsOfInterest,
    followedPoi,
    onPoiClick
}: Props): JSX.Element => {
    return (
        <>
            {Object.values(pointsOfInterest).map((poi: PointOfInterest) => {
                const followedClass = followedPoi === poi ? ` ${styles.navItemFollowed}` : "";
                const title = followedPoi === poi ? "Click again to stop following" : undefined;
                const onClick = (): void => onPoiClick(poi);
                return (
                    <div key={poi.display}>
                        <div
                            className={`${commonStyles.button} ${styles.navItem}${followedClass}`}
                            onClick={onClick}
                            onKeyPress={getOnEnterPress(onClick)}
                            role="button"
                            tabIndex={0}
                            title={title}
                        >
                            {poi.display}
                        </div>
                    </div>
                );
            })}{" "}
        </>
    );
};

export default PointsOfInterestMenu;

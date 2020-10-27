import React, { RefObject, FC } from "react";
import Planet from "../bodies/Planet";

import styles from "./Neptune.module.scss";

const NeptuneConsts = {
  radius: 24764,
  distance: 4495100000,
  orbitalPeriod: 59800,
};

interface Props {
  scrollToRef: RefObject<HTMLDivElement>;
}

const Neptune: FC<Props> = ({ scrollToRef }) => (
  <Planet name={styles.neptune} planetConstants={NeptuneConsts} scrollToRef={scrollToRef} />
);

export default Neptune;

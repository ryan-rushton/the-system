import React, { CSSProperties, FC, RefObject } from "react";

interface BeltRockProps {
  x: number;
  y: number;
  luminosity: number;
  size: number;
  beltRadius: number;
  scrollToRef?: RefObject<HTMLDivElement>;
}

const BeltRock: FC<BeltRockProps> = ({ x, y, luminosity, size, beltRadius, scrollToRef }) => {
  const left = beltRadius + x;
  const top = beltRadius + y;
  const style: CSSProperties = {
    backgroundColor: "rgb(210, 210, 210)",
    height: size,
    left: `${left}px`,
    opacity: luminosity,
    position: "absolute",
    top: `${top}px`,
    width: size,
  };

  return <div className="belt-rock" style={style} ref={scrollToRef} />;
};

export default BeltRock;

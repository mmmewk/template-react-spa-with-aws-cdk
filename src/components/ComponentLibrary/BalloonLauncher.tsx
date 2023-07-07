import React, { useEffect, useRef, useState } from "react";
import Balloon from "./Balloon";
import random from "lodash/random";
import sample from "lodash/sample";

type Props = {
  trigger: boolean;
};

type BalloonProps = React.ComponentProps<typeof Balloon>;

// [min, max] left offset for balloons
const leftRange = [0, 100] as const;
// [min, max] flight duration for balloons
const flightDurationRange = [2000, 3000] as const;
// [min, max] balloon count
const balloonCountRange = [10, 15] as const;

const BalloonLauncher: React.FC<Props> = (props) => {
  const [balloons, setBalloons] = useState<BalloonProps[]>([]);
  // using a ref so it won't trigger useEffect when it changes
  const flying = useRef<boolean>();

  // generate new set of random balloons on trigger
  useEffect(() => {
    if (!props.trigger || flying.current) return;

    const colors = ["red", "yellow", "green", "blue"] as const;
    const generateBalloon = () => {
      return {
        key: Math.random(),
        left: `calc(${random(...leftRange)}vw - 60px)`,
        flightDuration: random(...flightDurationRange),
        color: sample(colors),
      };
    };

    setBalloons(
      new Array(random(...balloonCountRange)).fill(null).map(generateBalloon)
    );

    flying.current = true;
    setTimeout(() => {
      flying.current = false;
    }, flightDurationRange[0]);
  }, [props.trigger, flying]);

  if (!props.trigger && !flying.current) return null;

  return (
    <>
      {balloons.map((balloonProps) => (
        <Balloon {...balloonProps} />
      ))}
    </>
  );
};

export default BalloonLauncher;

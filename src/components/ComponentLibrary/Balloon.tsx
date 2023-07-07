import React, { useEffect, useState } from "react";

type Props = {
  left: string;
  flightDuration: number;
  color?: "red" | "yellow" | "blue" | "green";
};

const Balloon: React.FC<Props> = (props) => {
  const [bottom, setBottom] = useState<string>("-300px");

  useEffect(() => {
    setBottom("100vh");
  }, [setBottom]);

  return (
    <img
      src={`/${props.color || "red"}-balloon.gif`}
      alt="balloon"
      className={"balloon"}
      style={{ bottom }}
    />
  );
};

export default Balloon;

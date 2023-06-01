import React from "react";
import { useQueryParam } from "../../utils/hooks";
import sample from "lodash/sample";

const QueryString: React.FC = () => {
  const [a, setA] = useQueryParam<number>("a", {
    parseNumbers: true,
    defaultValue: 0,
  });
  const [b, setB] = useQueryParam<string>("b", { defaultValue: "" });
  const [c, setC] = useQueryParam<number[]>("c", {
    parseNumbers: true,
    defaultValue: [],
  });
  const [d, setD] = useQueryParam<boolean[]>("d", {
    parseBooleans: true,
    defaultValue: [],
  });

  const randomNumber = () => Math.round(100 * Math.random());
  const randomBoolean = () => sample([true, false]) as boolean;

  return (
    <div>
      <h1 className="text-lg font-bold">QueryString</h1>
      <p>a: {a}</p>
      <button onClick={() => setA(a + 1)} className="mr-2">
        Increment A
      </button>
      <button onClick={() => setA(0)}>Reset A</button>
      <p>
        b:{" "}
        <input
          className="defaultInput"
          value={b}
          onChange={(event) => setB(event.target.value)}
        />
      </p>
      <p>
        c: [{c.join(", ")}]
        <br />
        <button
          onClick={() => setC([...c, randomNumber()])}
          className="mr-2 mt-2"
        >
          Add Value to C
        </button>
        <button onClick={() => setC([])} className="mr-2">
          Reset C
        </button>
      </p>
      <p>
        d: [{d.join(", ")}]
        <br />
        <button
          onClick={() => setD([...d, randomBoolean()])}
          className="mr-2 mt-2"
        >
          Add Value to D
        </button>
        <button onClick={() => setD([])} className="mr-2">
          Reset D
        </button>
      </p>
    </div>
  );
};
export default QueryString;

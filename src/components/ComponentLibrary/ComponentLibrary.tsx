import React, { useState } from "react";
import startCase from "lodash/startCase";
import Toggle from "./Toggle";
import Select from "./Select";
import Spinner from "./Spinner";

type ToggleType = "a" | "b";
type SelectType = "a" | "b" | "c" | "d";

const CustomComponents: React.FC = () => {
  const [toggleValue, setToggleValue] = useState<ToggleType>("a");
  const [selectValue, setSelectValue] = useState<SelectType>("a");
  return (
    <div>
      <h1 className="text-lg font-bold">Custom Components</h1>
      <Toggle
        label="Toggle"
        value={toggleValue}
        setValue={(value: ToggleType) => setToggleValue(value)}
        left={{ label: "Option A", value: "a" }}
        right={{ label: "Option B", value: "b" }}
      />
      <label>Spinner</label>
      <Spinner />
      <Select
        label="Select"
        value={selectValue}
        setValue={(value: SelectType) => setSelectValue(value)}
        options={["a", "b", "c", "d"]}
        optionLabel={(value) => `Option ${startCase(value)}`}
      />
      <p>
        Read More about React Select{" "}
        <a
          href="https://react-select.com/home"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </p>
    </div>
  );
};
export default CustomComponents;

import startCase from "lodash/startCase";
import { PropsWithChildren } from "react";
import ReactSelect from "react-select";

interface Props<T> {
  // Label for the dropdown
  label: string;
  // Current selected value
  value: T;
  // Callback to set the value
  setValue: (value: T) => void;
  // Options to add to the select
  options: T[];
  // Function to convert an option to a string
  optionLabel?: (option: T) => string;
}

const Select = <T extends unknown>({
  label,
  value,
  setValue,
  options,
  optionLabel,
}: PropsWithChildren<Props<T>>) => {
  const getLabel = (option: T) => {
    if (optionLabel) return optionLabel(option);
    return startCase(`${option}`);
  };

  const selectOptions = options.map((option) => {
    return { label: getLabel(option), value: option };
  });

  return (
    <div className="m-2">
      <div>
        <label>{label}</label>
        <br />
        <ReactSelect
          value={selectOptions.find((option) => option.value === value)}
          options={selectOptions}
          onChange={(option) => {
            if (option) setValue(option.value);
          }}
        />
      </div>
    </div>
  );
};
export default Select;

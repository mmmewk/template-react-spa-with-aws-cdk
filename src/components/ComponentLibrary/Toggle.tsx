import cn from "classnames";
import { PropsWithChildren } from "react";

type ToggleValue<T> = {
  // Text to display in the toggle button
  label: string;
  // Value to set when toggle is clicked
  value: T;
};

interface Props<T> {
  // Label for the toggle element
  label: string;
  // Currently selected vaue
  value: T;
  // Callback to set the value
  setValue: (value: T) => void;
  // Value to set when clicking on the left side of the toggle
  left: ToggleValue<T>;
  // Value to set when clicking on the right side of the toggle
  right: ToggleValue<T>;
}

const Toggle = <T,>({
  label,
  value,
  setValue,
  left,
  right,
}: PropsWithChildren<Props<T>>) => {
  return (
    <div className="m-2">
      <div>
        <label>{label}</label>
        <br />
        <button
          onClick={() => setValue(left.value)}
          className={cn([
            "rounded-r-none",
            {
              "bg-white text-indigo-900": value !== left.value,
              "bg-indigo-900 text-white": value === left.value,
            },
          ])}
        >
          {left.label}
        </button>
        <button
          onClick={() => setValue(right.value)}
          className={cn([
            "rounded-l-none",
            {
              "bg-white text-indigo-900": value !== right.value,
              "bg-indigo-900 text-white": value === right.value,
            },
          ])}
        >
          {right.label}
        </button>
      </div>
    </div>
  );
};
export default Toggle;

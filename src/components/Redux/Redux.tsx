import React from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCounter,
  resetCounter,
} from "../../redux/slices/exampleSlice";

const Redux: React.FC = () => {
  const counter = useSelector((state: RootState) => state.example.counter);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(incrementCounter(1));
  };

  const reset = () => {
    dispatch(resetCounter());
  };

  return (
    <div>
      <h1 className="text-lg font-bold">Redux</h1>
      <p>This is a counter stored in Redux: {counter}</p>
      <button onClick={increment} className="mr-2">
        Increment Counter
      </button>
      <button onClick={reset} className="mb-3">
        Reset Counter
      </button>
      <p>
        Read More about Redux toolkit{" "}
        <a
          href="https://redux-toolkit.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </p>
    </div>
  );
};
export default Redux;

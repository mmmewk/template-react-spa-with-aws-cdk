import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { RootState } from "./redux/store";
import { incrementCounter } from "./redux/slices/exampleSlice";

function App() {
  const counter = useSelector((state: RootState) => state.example.counter);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(incrementCounter(1));
  };

  return (
    <div className="App p-5">
      <p className="Red">This is a paragraph styled with scss</p>
      <p className="text-indigo-500">
        This is a paragraph styled with tailwindcss
      </p>
      <label className="text-lg font-bold">
        Counter stored in persistant redux state: {counter}
      </label>
      <br />
      <button onClick={increment}>Increment Counter</button>
    </div>
  );
}

export default App;

import React from "react";
import { toast } from "react-toastify";

const Toast: React.FC = () => {
  return (
    <div>
      <h1 className="text-lg font-bold">Toast</h1>
      <button onClick={() => toast("This is a toast message")} className="mr-2">
        Click to toast
      </button>
    </div>
  );
};
export default Toast;

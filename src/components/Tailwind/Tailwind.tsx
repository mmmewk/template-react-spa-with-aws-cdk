import React from "react";

const Tailwind: React.FC = () => {
  return (
    <div>
      <h1 className="text-lg font-bold">Tailwind CSS</h1>
      <p className="text-indigo-500">
        This is a paragraph styled with tailwind css
      </p>
      <p>
        Read More about Tailwind css <a href="https://tailwindcss.com/">here</a>
      </p>
    </div>
  );
};
export default Tailwind;

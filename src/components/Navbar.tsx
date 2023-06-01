import React from "react";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <nav className="w-full h-10 bg-gray-700">
      <ul className="w-40 h-10 p-2 flex justify-between items-center list-none">
        <Link to="/" className="mx-2 whitespace-nowrap">
          <li className="text-gray-50">Home</li>
        </Link>
        <Link to="/tailwind" className="mx-2 whitespace-nowrap">
          <li className="text-gray-50">Tailwind CSS</li>
        </Link>
        <Link to="/redux" className="mx-2 whitespace-nowrap">
          <li className="text-gray-50">Redux</li>
        </Link>
        <Link to="/component-library" className="mx-2 whitespace-nowrap">
          <li className="text-gray-50">Component Library</li>
        </Link>
      </ul>
    </nav>
  );
};
export default Navbar;

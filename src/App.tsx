import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Tailwind from "./components/Tailwind";
import Redux from "./components/Redux";
import ComponentLibrary from "./components/ComponentLibrary";
import Toast from "./components/Toast";
import RTKQuery from "./components/RTKQuery/RTKQuery";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tailwind" element={<Tailwind />} />
          <Route path="/redux" element={<Redux />} />
          <Route path="/rtk-query" element={<RTKQuery />} />
          <Route path="/component-library" element={<ComponentLibrary />} />
          <Route path="/toast" element={<Toast />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

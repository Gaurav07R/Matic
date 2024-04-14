// App.jsx
import React, { useState, useEffect } from "react";
import LineGraphComponent from "./components/LineGraphComponent";
import TableComponent from "./components/TableComponent";
// import logo from './assets/icons8-logo.svg'
function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleCheckboxChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="container mx-auto p-5 ">
      {/* Move the image and text to top-left corner */}
     
      {/* Place the toggle button at the top-right corner */}
      <div className="flex  items-center justify-end mb-4">
        <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <span
            className={`label flex items-center text-sm font-medium ${
              darkMode ? "text-white bg-slate-800 p-1" : "text-black bg-white p-1"
            }`}
          >
            Light
          </span>
          <span className="slider border border-black mx-4 flex h-6 w-[60px] items-center rounded-full p-1 duration-200">
            <span
              className={`dot h-4 w-6 rounded-full bg-gray-500 duration-200 ${
                darkMode ? "translate-x-[28px]" : ""
              }`}
            ></span>
          </span>
          <span
            className={`label flex items-center text-sm font-medium ${
              darkMode ? "text-white bg-slate-800 p-1" : "text-black bg-white p-1"
            }`}
          >
            Dark
          </span>
        </label>
      </div>
      <div className="flex items-center mb-4">
      {/* <img
        className="h-20 mr-4"
        src={logo}
        alt=""
      /> */}
      <h5 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
        Drawdown Periods
      </h5>
    </div>
      {/* Display components in a column on small screens and in a row on large screens */}
      <div className={`lg:flex lg:flex-row border ${darkMode ? 'border-none' : 'border'}`}>
        <LineGraphComponent  darkMode={darkMode} />
        <TableComponent darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;


import React, { useState, useEffect } from "react";
import ddperiod from "../data/ddperiod.json";

function TableComponent({ darkMode }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(ddperiod.data);
  }, []);

  return (
    <div className="lg:w-1/2">
      <div className="overflow-x-auto mx-auto">
        <div
          className={`max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl border ${
            darkMode ? "border-gray-600" : "border-gray-300"
          } rounded-lg p-2`}
        >
          <table
            className={`w-full table-auto border-collapse ${
              darkMode ? "text-white" : ""
            }`}
          >
            <thead>
              <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                <th className="px-2 py-1 text-xs font-medium border-b border-gray-300">
                  Period
                </th>
                <th className="px-2 py-1 text-xs font-medium border-b border-gray-300">
                  Max Drawdown
                </th>
                <th className="px-2 py-1 text-xs font-medium border-b border-gray-300">
                  Time for Recovery
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((period, index) => (
                <tr
                  key={index}
                  className={`hover:${
                    darkMode ? "bg-gray-600" : "bg-gray-200"
                  }`}
                >
                  <td
                    className={`px-2 py-2 text-xs border-b border-gray-300 ${
                      darkMode ? "text-white" : ""
                    }`}
                  >
                    {period.Start_Date} - {period.End_Date}
                  </td>
                  <td
                    className={` font-semibold px-2 py-2 text-xs border-b border-gray-300  ${
                      period.Max_Drawdown < 0 ? "text-red-500 " : "text-green-500 "
                    }`}
                  >
                    {period.Max_Drawdown}
                  </td>
                  <td
                    className={`px-2 py-2 text-xs border-b border-gray-300 ${
                      darkMode ? "text-white" : ""
                    }`}
                  >
                    {period.Time_for_recovery}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableComponent;

import React, { useRef, useState, useEffect } from "react";
import { createChart } from "lightweight-charts";
import jsonData from "../data/returns.json";
import { useMediaQuery } from 'react-responsive';

const LineGraphComponent = ({ darkMode }) => {
  const chartContainer = useRef(null);
  const [selectedKey, setSelectedKey] = useState("combined"); // Default selected key
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Detect if the screen width is less than or equal to 768px

  useEffect(() => {
    const chart = createChart(chartContainer.current);

    // Extracting data based on the selected key
    const selectedData = jsonData.data[selectedKey];

    // Extracting dates and pnl values from selected data
    const dates = selectedData.map((item) => item.date);
    const pnlValues = selectedData.map((item) => item.pnl);

    // Chart data
    const lineSeries = chart.addLineSeries({
      lineWidth: 2,
      color: darkMode ? "white" : "red", // Default line color
      fillColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 0, 0, 0.1)", // Default fill color for area below the red line
    });

    const seriesData = pnlValues.map((value, index) => {
      const color = value > 0 ? "red" : "gray";
      return { time: dates[index], value: value, color: color };
    });

    lineSeries.setData(seriesData);

    // Set up the chart layout
    chart.applyOptions({
      layout: {
        background: {
          color: darkMode ? "#333333" : "#f8f8f8",
        },
        textColor: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 1)",
      },
      grid: {
        vertLines: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.15)",
        },
        horzLines: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.15)",
        },
      },
      priceScale: {
        position: "left",
        borderVisible: false,
      },
      timeScale: {
        borderVisible: true,
        borderColor: darkMode ? "white" : "black",
      },
      rightPriceScale: {
        borderVisible: true,
        borderColor: darkMode ? "white" : "black",
      },
      crosshair: {
        vertLine: {
          visible: true,
        },
        horzLine: {
          visible: true,
        },
      },
    });

    chart.timeScale().fitContent();

    return () => {
      chart.removeSeries(lineSeries);
      chart.remove();
    };
  }, [darkMode, selectedKey, isMobile]);

  // Function to handle dropdown menu change
  const handleSelectChange = (e) => {
    setSelectedKey(e.target.value);
  };

  return (
    <div className={`  ${isMobile ? 'w-80' : 'w-2/3'}`}>
      {/* Dropdown menu */}
      <select
        value={selectedKey}
        onChange={handleSelectChange}
        className={`mb-4 rounded-lg ${
          darkMode ? "text-white bg-slate-800 border p-1" : "text-black bg-white border p-1"
        }`}
      >
        {Object.keys(jsonData.data).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <div ref={chartContainer} style={{ width: "100%", height: "300px" }} />
    </div>
  );
};

export default LineGraphComponent;

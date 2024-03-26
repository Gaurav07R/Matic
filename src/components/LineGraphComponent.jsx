import React, { useRef, useState, useEffect } from "react";
import { createChart } from "lightweight-charts";
import jsonData from "../data/returns.json";
import { useMediaQuery } from "react-responsive";
import logo from "../assets/icons8-logo.svg"; // Import the logo image

const LineGraphComponent = ({ darkMode }) => {
  const chartContainer = useRef(null);
  const [selectedKey, setSelectedKey] = useState("combined");
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const chart = createChart(chartContainer.current);

    // Extracting data based on the selected key
    const selectedData = jsonData.data[selectedKey];
    const dates = selectedData.map((item) => item.date);
    const cumsumValues = selectedData.map((item) => item.cumsum);

    // Chart data
    const lineSeries = chart.addLineSeries({
      lineWidth: 2,
      color: "#2962FF", // Initial color
    });

    const seriesData = cumsumValues.map((value, index) => {
      let color;
      if (index > 0) {
        color = value > cumsumValues[index - 3] ? "gray" : "red";
      } else {
        color = "red";
      }
      return { time: dates[index], value: value, color: color };
    });

    lineSeries.setData(seriesData);

    // Apply chart options
    chart.applyOptions({
      layout: {
        background: {
          color: darkMode ? "#333333" : "#f8f8f8",
          repeat: "no-repeat",
          size: "50%",
          position: "bottom right",
          opacity: 0.2,
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
        visible: true,
      },
      priceScale: [
        {
          id: 'left-price-scale',
          position: 'left',
          borderColor: 'red',
          visible: true,
        },
        {
          id: 'right-price-scale',
          position: 'right',
          borderVisible: false,
          visible: true,
        }
      ],
      timeScale: {
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

    // Position the logo on the chart
    const img = document.createElement("img");
    img.src = logo;
    img.style.position = "absolute";
    img.style.bottom = "30px";
    img.style.right = "110px";
    img.style.width = "100px";
    img.style.height = "auto";
    img.style.zIndex = 1;
    img.style.opacity = 0.4; // Adjust the opacity value as needed (0.5 for 50% opacity)
    chartContainer.current.appendChild(img);

    // Set the z-index of the line series to ensure it appears above the logo
    const lineSeriesElement =
      chartContainer.current.querySelector(".line-series");
    if (lineSeriesElement) {
      lineSeriesElement.style.zIndex = 2;
    }

    chart.timeScale().fitContent();

    return () => {
      chart.removeSeries(lineSeries);
      chart.remove();
    };
  }, [darkMode, selectedKey, isMobile]);

  const handleSelectChange = (e) => {
    setSelectedKey(e.target.value);
  };

  return (
    <div className={`  ${isMobile ? "w-80" : "w-2/3"}`}>
      {/* Dropdown menu */}
      <select
        value={selectedKey}
        onChange={handleSelectChange}
        className={`mb-4 rounded-lg ${
          darkMode
            ? "text-white bg-slate-800 border p-1"
            : "text-black bg-white border p-1"
        }`}
      >
        {Object.keys(jsonData.data).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <div
        ref={chartContainer}
        style={{ width: "100%", height: "300px", position: "relative" }}
      />
    </div>
  );
};

export default LineGraphComponent;

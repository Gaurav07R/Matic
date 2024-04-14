import React, { useRef, useState, useEffect } from "react";
import { createChart } from "lightweight-charts";
import jsonData from "../data/returns.json";
import { useMediaQuery } from "react-responsive";
import logo from "../assets/icons8-logo.svg";

const LineGraphComponent = ({ darkMode }) => {
  const chartContainer = useRef(null);
  const [selectedKey, setSelectedKey] = useState("combined");
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const chart = createChart(chartContainer.current, {
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

    const selectedData = jsonData.data[selectedKey];
    const dates = selectedData.map((item) => item.date);
    const cumsumValues = selectedData.map((item) => item.cumsum);

    const lineSeries = chart.addLineSeries({
      lineWidth: 2,
    });

    const seriesData = cumsumValues.map((value, index) => {
      let color = darkMode ? "#2962FF" : "#000000"; // Default color

      // Check for each specified date range and change color to red if condition met
      if (
        (dates[index] >= "2024-02-21" && dates[index] <= "2024-03-14") ||
        (dates[index] >= "2024-02-14" && dates[index] <= "2024-02-16") ||
        (dates[index] >= "2024-01-31" && dates[index] <= "2024-02-08") ||
        (dates[index] >= "2024-01-08" && dates[index] <= "2024-01-17")
      ) {
        color = "red";
      } else {
        color = darkMode ? "gray" : "#808080";
      }
      
      return { time: dates[index], value: value, color: color };
    });

    lineSeries.setData(seriesData);

    chart.applyOptions({
      // Your chart options here
    });

    const img = document.createElement("img");
    img.src = logo;
    img.style.position = "absolute";
    img.style.bottom = "30px";
    img.style.right = "110px";
    img.style.width = "100px";
    img.style.height = "auto";
    img.style.zIndex = 1;
    img.style.opacity = 0.4;
    chartContainer.current.appendChild(img);

    const lineSeriesElement =
      chartContainer.current.querySelector(".line-series");
    if (lineSeriesElement) {
      lineSeriesElement.style.zIndex = 2;
    }

    chart.timeScale().fitContent();

    const handleMouseMove = (event) => {
      // Handle mouse move event
    };
    
    const handleMouseLeave = () => {
      // Handle mouse leave event
    };

    chartContainer.current.addEventListener("mousemove", handleMouseMove);
    chartContainer.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      chart.removeSeries(lineSeries);
      chartContainer.current.removeEventListener("mousemove", handleMouseMove);
      chartContainer.current.removeEventListener("mouseleave", handleMouseLeave);
      chart.remove();
    };
  }, [darkMode, selectedKey, isMobile]);

  const handleSelectChange = (e) => {
    setSelectedKey(e.target.value);
  };

  return (
    <div className={`  ${isMobile ? "w-80" : "w-2/3"}`}>
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

import React, { useState, useEffect, useRef } from "react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Upload } from "lucide-react";
import { Graph } from "./Graph";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initialMonthlyData = {
  labels: [
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ],
  datasets: [
    {
      label: "Monthly Consumption (kWh)",
      backgroundColor: "rgba(82, 183, 136, 1)",
      borderColor: "rgba(34, 197, 94, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(56, 163, 165, 1)",
      hoverBorderColor: "rgba(56, 163, 165, 1)",
      data: [320, 290, 310, 400, 420, 390, 450, 430, 410, 380, 370, 400],
    },
  ],
};

const Electricity1 = () => {
  const [powerConsumption, setPowerConsumption] = useState("");
  const [monthlyData, setMonthlyData] = useState(initialMonthlyData);
  const chartRef = useRef(null);

  const handleChange = (e) => {
    setPowerConsumption(e.target.value);
  };

  const getNextMonth = (currentMonth) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentIndex = months.indexOf(currentMonth);
    return currentIndex === 11 ? months[0] : months[currentIndex + 1];
  };

  const handleSubmit = () => {
    const newPowerConsumption = parseInt(powerConsumption, 10);

    if (!isNaN(newPowerConsumption)) {
      setMonthlyData((prevData) => {
        // Get the new labels array by removing the first month and adding the next month
        const lastMonth = prevData.labels[prevData.labels.length - 1];
        const newLabels = [
          ...prevData.labels.slice(1),
          getNextMonth(lastMonth),
        ];

        // Update the datasets
        const newDatasets = prevData.datasets.map((dataset) => ({
          ...dataset,
          data: [...dataset.data.slice(1), newPowerConsumption],
        }));

        return {
          labels: newLabels,
          datasets: newDatasets,
        };
      });

      // Clear the input after submission
      setPowerConsumption("");
    } else {
      console.error("Invalid power consumption input");
    }
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 ml-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-center text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-6xl font-extrabold mb-4">
            Electricity Consumption Dashboard
          </h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Track your monthly power consumption and analyze trends. Enter your
            latest reading to get updated insights.
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="container mx-auto px-6 -mt-16">
        <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-lg flex items-center flex-col border border-teal-300">
          <Upload className="h-14 w-14 text-teal-700 mb-4" />
          <h2 className="text-3xl font-semibold text-teal-900 mb-2 text-center">
            Enter Your Power Consumption
          </h2>
          <p className="text-teal-600 mb-6 text-center">
            Input your current power consumption (in kWh)
          </p>
          <div className="flex w-full max-w-sm items-center justify-center space-x-2">
            <Input
              type="number"
              placeholder="Power Consumption"
              value={powerConsumption}
              onChange={handleChange}
            />
            <Button onClick={handleSubmit}>Enter</Button>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="container mx-auto px-6 py-12 rounded-lg">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-teal-200">
          <h3 className="text-xl font-semibold text-teal-800 mb-4">
            Monthly Electricity Consumption
          </h3>
          <div className="relative" style={{ height: "300px" }}>
            <Bar
              ref={chartRef}
              data={{
                ...monthlyData,
                datasets: monthlyData.datasets.map((dataset) => ({
                  ...dataset,
                  borderRadius: 10, // Adjust this value to make the bars more or less rounded
                })),
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                  duration: 750,
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "rgba(0, 0, 0, 0.1)",
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
              height={300}
            />
          </div>
        </div>
      </div>

      {/* Analysis Cards Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-6">
          {/* Card 1 - Average Consumption */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-teal-300 p-6">
            <h3 className="text-xl font-semibold text-teal-800 mb-4">
              Average Monthly Consumption
            </h3>
            <p className="text-teal-800 text-2xl font-bold">385 kWh</p>
            <p className="text-gray-600 mt-2">Based on your yearly data</p>
          </div>

          {/* Card 2 - Peak Usage Month */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-teal-300 p-6">
            <h3 className="text-xl font-semibold text-teal-800 mb-4">
              Peak Usage Month
            </h3>
            <p className="text-teal-800 text-2xl font-bold">May</p>
            <p className="text-gray-600 mt-2">Highest recorded at 450 kWh</p>
          </div>

          {/* Card 3 - Suggested Reduction Tips */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-teal-300 p-6">
            <h3 className="text-xl font-semibold text-teal-800 mb-4">
              Suggested Tips
            </h3>
            <ul className="list-disc ml-5 text-teal-800">
              <li>Switch to LED bulbs</li>
              <li>Use energy-efficient appliances</li>
              <li>Reduce AC usage during peak hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Electricity1;

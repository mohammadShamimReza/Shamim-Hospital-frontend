"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

// Register required elements for Chart.js
ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const DoctorOverview = () => {
  // Mock Data (Replace this with real API calls)
  const patientData = {
    labels: ["New", "Ongoing", "Completed"],
    datasets: [
      {
        data: [15, 25, 60],
        backgroundColor: ["#36A2EB", "#FFCE56", "#4CAF50"],
        hoverBackgroundColor: ["#63B3ED", "#FFD97C", "#66BB6A"],
      },
    ],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue Generated ($)",
        data: [5000, 6000, 7000, 8000, 7500, 9000],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        pointBorderColor: "#388E3C",
        tension: 0.4,
      },
    ],
  };

  const appointmentsData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Appointments",
        data: [12, 15, 10, 18, 14, 20],
        backgroundColor: "#36A2EB",
        hoverBackgroundColor: "#63B3ED",
      },
    ],
  };

  const diagnosticData = {
    labels: ["Blood Test", "X-Ray", "MRI", "CT Scan"],
    datasets: [
      {
        data: [50, 30, 15, 5],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverBackgroundColor: ["#FF7A99", "#63B3ED", "#FFD97C", "#66BB6A"],
      },
    ],
  };

  const topServicesData = {
    labels: ["General Checkup", "Cardiology", "Orthopedics", "Neurology"],
    datasets: [
      {
        label: "Number of Services",
        data: [45, 30, 20, 10],
        backgroundColor: "#FFCE56",
        hoverBackgroundColor: "#FFD97C",
      },
    ],
  };

  return (
    <div className="p-8  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 ">
        Doctor&apos;s Overview Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Patient Overview */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Patient Overview
          </h2>
          <Pie data={patientData} />
        </div>

        {/* Revenue Generated */}
        <div className="p-4 bg-white rounded-lg shadow-lg col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Revenue Generated Over Months
          </h2>
          <Line data={revenueData} />
        </div>

        {/* Appointments Per Day */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Appointments Per Day
          </h2>
          <Bar data={appointmentsData} />
        </div>

        {/* Diagnostic Tests Conducted */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Diagnostic Tests Conducted
          </h2>
          <Doughnut data={diagnosticData} />
        </div>

        {/* Top Services Provided */}
       
      </div>
    </div>
  );
};

export default DoctorOverview;

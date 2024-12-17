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

const PatientOverview = () => {
  // Mock Data (Replace this with real API calls)
  const appointmentData = {
    labels: ["Upcoming", "Completed", "Canceled"],
    datasets: [
      {
        data: [3, 10, 2],
        backgroundColor: ["#4CAF50", "#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#66BB6A", "#63B3ED", "#FF7A99"],
      },
    ],
  };

  const billingData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Paid Amount ($)",
        data: [200, 150, 300, 250, 400],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
      {
        label: "Due Amount ($)",
        data: [50, 75, 20, 100, 80],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const diagnosticData = {
    labels: ["Blood Test", "X-Ray", "MRI", "ECG"],
    datasets: [
      {
        data: [4, 2, 1, 3],
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4CAF50"],
        hoverBackgroundColor: ["#FFD97C", "#63B3ED", "#FF7A99", "#66BB6A"],
      },
    ],
  };

  const serviceData = {
    labels: ["General Checkup", "Cardiology", "Physiotherapy"],
    datasets: [
      {
        label: "Services Received",
        data: [5, 2, 3],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF7A99", "#63B3ED", "#FFD97C"],
      },
    ],
  };

  const activityData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Activities",
        data: [4, 8, 5, 7, 6, 9],
        backgroundColor: "#36A2EB",
        hoverBackgroundColor: "#63B3ED",
      },
    ],
  };

  return (
    <div className="p-8  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 ">
        Patient&apos;s Overview Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Appointment Summary */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Appointments Summary
          </h2>
          <Pie data={appointmentData} />
        </div>

        {/* Billing Summary */}
        <div className="p-4 bg-white rounded-lg shadow-lg col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Billing History
          </h2>
          <Line data={billingData} />
        </div>

        {/* Diagnostic Tests */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Diagnostic Tests Overview
          </h2>
          <Doughnut data={diagnosticData} />
        </div>

        {/* Services Received */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Services Received
          </h2>
          <Bar
            data={serviceData}
            options={{
              indexAxis: "y", // Horizontal Bar Chart
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

        {/* Activity Timeline */}
        <div className="p-4 bg-white rounded-lg shadow-lg col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Monthly Activity Timeline
          </h2>
          <Bar data={activityData} />
        </div>
      </div>
    </div>
  );
};

export default PatientOverview;

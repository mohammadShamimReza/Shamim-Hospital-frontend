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

// Register ChartJS components
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

const NurseOverview = () => {
  // Mock Data (Replace with real API data)
  const roomAssignmentsData = {
    labels: ["Room 101", "Room 102", "Room 103", "Room 104"],
    datasets: [
      {
        data: [2, 3, 5, 4],
        backgroundColor: ["#4CAF50", "#36A2EB", "#FFCE56", "#FF6384"],
        hoverBackgroundColor: ["#66BB6A", "#63B3ED", "#FFD97C", "#FF7A99"],
      },
    ],
  };

  const patientCareData = {
    labels: ["John Doe", "Jane Smith", "Sam Wilson", "Mark Lee", "Emily Davis"],
    datasets: [
      {
        label: "Patients Assigned",
        data: [8, 5, 7, 6, 4],
        backgroundColor: "#36A2EB",
        hoverBackgroundColor: "#63B3ED",
      },
    ],
  };

  const taskCompletionData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [20, 10, 5],
        backgroundColor: ["#4CAF50", "#FFCE56", "#FF6384"],
        hoverBackgroundColor: ["#66BB6A", "#FFD97C", "#FF7A99"],
      },
    ],
  };

  const workHoursData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Work Hours (Hrs)",
        data: [160, 175, 180, 170, 165, 185],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Nurse Overview Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Room Assignments */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Room Assignments
          </h2>
          <Pie data={roomAssignmentsData} />
        </div>

        {/* Patient Care */}
        <div className="p-4 bg-white rounded-lg shadow-lg col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Patient Care Summary
          </h2>
          <Bar
            data={patientCareData}
            options={{
              indexAxis: "y",
              plugins: { legend: { display: false } },
            }}
          />
        </div>

        {/* Task Completion */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Task Completion
          </h2>
          <Doughnut data={taskCompletionData} />
        </div>

        {/* Work Hours */}
        <div className="p-4 bg-white rounded-lg shadow-lg col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Monthly Work Hours
          </h2>
          <Line data={workHoursData} />
        </div>

        {/* Activity Log */}
        
      </div>
    </div>
  );
};

export default NurseOverview;

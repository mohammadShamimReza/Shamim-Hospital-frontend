import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// Register Chart.js elements
ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement, // <-- Add this for Line charts
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

// Dummy Data (Replace this with API calls later)
const stats = [
  { label: "Total Appointments", value: "450", growth: "+10%" },
  { label: "Active Patients", value: "1,500", growth: "+5%" },
  { label: "Monthly Revenue", value: "$50,000", growth: "+20%" },
  { label: "Pending Diagnostics", value: "35", growth: "-3%" },
  { label: "Available Inventory", value: "800 Items", growth: "-1%" },
  { label: "Staff Members", value: "120", growth: "+8%" },
];

const appointmentStatusData = {
  labels: ["Requested", "Scheduled", "Completed", "Cancelled"],
  datasets: [
    {
      data: [15, 35, 40, 10],
      backgroundColor: ["#007bff", "#ffc107", "#28a745", "#dc3545"],
      hoverOffset: 4,
    },
  ],
};

const revenueExpenseData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [15000, 20000, 25000, 30000, 35000, 40000],
      backgroundColor: "#28a745",
    },
    {
      label: "Expense",
      data: [12000, 15000, 18000, 25000, 30000, 32000],
      backgroundColor: "#dc3545",
    },
  ],
};

const patientDemographicsData = {
  labels: ["Male", "Female", "Other"],
  datasets: [
    {
      data: [60, 35, 5],
      backgroundColor: ["#007bff", "#ffc107", "#6c757d"],
      hoverOffset: 4,
    },
  ],
};

const inventoryCategoryData = {
  labels: ["Medicine", "Equipment", "Consumables"],
  datasets: [
    {
      data: [50, 30, 20],
      backgroundColor: ["#4dc9f6", "#f67019", "#f53794"],
    },
  ],
};

const diagnosticPriceTrendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Average Diagnostic Price ($)",
      data: [120, 130, 115, 140, 150, 135],
      borderColor: "#36a2eb",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      fill: true,
    },
  ],
};

export default function AdminOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-2xl font-bold ">Admin Dashboard</div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Appointment Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={appointmentStatusData} />
          </CardContent>
        </Card>

        {/* Revenue vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={revenueExpenseData}
              options={{
                responsive: true,
                scales: {
                  x: { stacked: true },
                  y: { stacked: true },
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Patient Demographics Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <Doughnut data={patientDemographicsData} />
          </CardContent>
        </Card>

        {/* Inventory Breakdown Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Doughnut data={inventoryCategoryData} />
          </CardContent>
        </Card>

        {/* Diagnostic Price Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Diagnostic Price Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Line
              data={diagnosticPriceTrendData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:shadow-xl transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-lg">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm">{stat.growth}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

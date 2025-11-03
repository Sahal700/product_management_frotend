import React from "react";
import { Receipt, TrendingUp, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ORDERS } from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const STATUS_CONFIG = {
  "request-material": {
    label: "Request Material",
    color: "#F59E0B",
    bgColor: "#F59E0B33",
  },
  "material-sent": {
    label: "Material Sent",
    color: "#3B82F6",
    bgColor: "#3B82F633",
  },
  "material-received": {
    label: "Material Received",
    color: "#A855F7",
    bgColor: "#A855F733",
  },
  "in-progress": {
    label: "In Progress",
    color: "#F97316",
    bgColor: "#F9731633",
  },
  completed: { label: "Completed", color: "#10B981", bgColor: "#10B98133" },
  cancelled: { label: "Cancelled", color: "#EF4444", bgColor: "#EF444433" },
};

function Dashboard() {
  const paymentData = [
    {
      label: "Total Sales Value",
      value: "₹234000.00",
      color: "#6B7FFF",
    },
    {
      label: "Amount Received (Paid)",
      value: "₹121150.00",
      color: "#10B981",
    },
    {
      label: "Total Amount Due (Outstanding)",
      value: "₹112850.00",
      color: "#F59E0B",
    },
  ];

  const statusData = [
    { label: "Completed", count: 3, progress: 30, color: "#10B981" },
    { label: "Partial", count: 4, progress: 40, color: "#F59E0B" },
    { label: "Pending", count: 2, progress: 20, color: "#EF4444" },
  ];

  const leadData = {
    completed: { count: 23, percentage: 74.19, color: "#10B981" },
    pending: { count: 5, percentage: 16.13, color: "#F59E0B" },
    cancelled: { count: 3, percentage: 9.68, color: "#EF4444" },
  };

  const circumference = 2 * Math.PI * 90;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter orders for today
  const todaysOrders = ORDERS;

  return (
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Summary Card */}
        <Card
          className="bg-primary"
          style={{
            border: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "#072133" }}
              >
                <Receipt className="h-6 w-6" style={{ color: "#6B7FFF" }} />
              </div>
              <CardTitle className="text-xl font-bold text-white">
                Payment Summary
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid md:grid-cols-2 gap-3">
              {/* Left Column - Payment Values */}
              <div className="space-y-3">
                {paymentData.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: "#072133" }}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className="w-1 h-10 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-lg font-bold text-white">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column - Status Progress */}
              <div className="space-y-3.5">
                {statusData.map((status, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: "#072133" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">
                        {status.label}
                      </span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: status.color }}
                      >
                        {status.count}
                      </span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full"
                      style={{ backgroundColor: "#374151" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${status.progress}%`,
                          backgroundColor: status.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead Progress Report Card */}
        <Card
          className="bg-primary"
          style={{
            border: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "#10B98133" }}
              >
                <TrendingUp className="h-6 w-6" style={{ color: "#10B981" }} />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-white">
                  Sales Progress Report
                </CardTitle>
                {/* <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#6B7FFF" }}
                  >
                    31 Leads
                  </span>
                  <span className="text-gray-500">•</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#10B981" }}
                  >
                    23 Customers
                  </span>
                </div> */}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex flex-col items-center justify-center py-2">
              {/* Donut Chart */}
              <div
                className="relative flex items-center justify-center"
                style={{ width: "180px", height: "180px" }}
              >
                <svg
                  width="180"
                  height="180"
                  viewBox="0 -10 200 220"
                  className="transform -rotate-90"
                >
                  {/* Completed segment - 74.19% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={leadData.completed.color}
                    strokeWidth="30"
                    strokeDasharray={`${
                      (leadData.completed.percentage / 100) * circumference
                    } ${circumference}`}
                    strokeDashoffset="0"
                  />
                  {/* Pending segment - 16.13% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={leadData.pending.color}
                    strokeWidth="30"
                    strokeDasharray={`${
                      (leadData.pending.percentage / 100) * circumference
                    } ${circumference}`}
                    strokeDashoffset={`-${
                      (leadData.completed.percentage / 100) * circumference
                    }`}
                  />
                  {/* Cancelled segment - 9.68% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={leadData.cancelled.color}
                    strokeWidth="30"
                    strokeDasharray={`${
                      (leadData.cancelled.percentage / 100) * circumference
                    } ${circumference}`}
                    strokeDashoffset={`-${
                      ((leadData.completed.percentage +
                        leadData.pending.percentage) /
                        100) *
                      circumference
                    }`}
                  />
                </svg>

                {/* Percentage Labels positioned around chart */}
                <div className="absolute" style={{ top: "20%", right: "5%" }}>
                  <span className="text-sm font-bold text-white">33.82</span>
                </div>
                <div className="absolute" style={{ top: "8%", right: "38%" }}>
                  <span className="text-sm font-bold text-white">4.41</span>
                </div>
                <div className="absolute" style={{ top: "25%", left: "5%" }}>
                  <span className="text-sm font-bold text-white">7.35</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: leadData.completed.color }}
                  />
                  <span className="text-sm text-gray-300">
                    completed ({leadData.completed.count})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: leadData.pending.color }}
                  />
                  <span className="text-sm text-gray-300">
                    partail ({leadData.pending.count})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: leadData.cancelled.color }}
                  />
                  <span className="text-sm text-gray-300">
                    pending ({leadData.cancelled.count})
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Today's Orders Card */}
        <Card
          className="bg-primary"
          style={{
            border: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
          }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "#F59E0B33" }}
                >
                  <Package className="h-5 w-5" style={{ color: "#F59E0B" }} />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-white">
                    Today's Orders
                  </CardTitle>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">
                  {todaysOrders.length}
                </p>
                <p className="text-xs text-gray-400">Orders</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            {todaysOrders.length === 0 ? (
              <div className="text-center py-6 text-gray-400">
                <Package className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No orders scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 md:max-h-64 overflow-y-auto custom-scrollbar pr-1">
                {todaysOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 rounded-lg hover:bg-opacity-80 transition-all"
                    style={{ backgroundColor: "#072133" }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-white text-sm truncate flex-1">
                        {order.customer?.name || "N/A"}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{
                          backgroundColor:
                            STATUS_CONFIG[order.status]?.bgColor || "#6B7FFF33",
                          color:
                            STATUS_CONFIG[order.status]?.color || "#6B7FFF",
                        }}
                      >
                        {STATUS_CONFIG[order.status]?.label || order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-gray-400">
                        <span>#{order.orderNumber}</span>
                        <span>•</span>
                        <span>{order.productions?.length || 0} items</span>
                      </div>
                      <p
                        className="text-base font-bold"
                        style={{ color: "#10B981" }}
                      >
                        ₹{order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Material Stock Chart */}
        <Card
          className="bg-primary"
          style={{
            border: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "#3B82F633" }}
              >
                <TrendingUp className="h-5 w-5" style={{ color: "#3B82F6" }} />
              </div>
              <CardTitle className="text-lg font-bold text-white">
                Material Stock Levels
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { material: "Flour", stock: 120 },
                  { material: "Sugar", stock: 80 },
                  { material: "Butter", stock: 50 },
                  { material: "Cocoa", stock: 30 },
                  { material: "Yeast", stock: 70 },
                ]}
                margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="material"
                  tick={{ fill: "#CBD5E1" }}
                  axisLine={false}
                />
                <YAxis tick={{ fill: "#CBD5E1" }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="stock" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;

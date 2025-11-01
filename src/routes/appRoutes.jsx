import MainLayout from "@/layout/mainLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Login from "@/pages/login/Login";
import Orders from "@/pages/orders/Orders";
import Sales from "@/pages/sales/Sales";
import Purchase from "@/pages/purchase/Purchase";
import Payment from "@/pages/payment/Payment";
import Productions from "@/pages/productions/Productions";
import Meterails from "@/pages/meterails/Meterails";
import { Routes, Route } from "react-router-dom";
import Customers from "@/pages/customers/Customer";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="sales" element={<Sales />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="payment" element={<Payment />} />
        <Route path="productions" element={<Productions />} />
        <Route path="meterails" element={<Meterails />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<p>Not Found</p>} />
    </Routes>
  );
}

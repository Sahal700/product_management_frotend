import MainLayout from "@/layout/mainLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Login from "@/pages/login/Login";
import Orders from "@/pages/orders/Orders";
import Sales from "@/pages/sales/Sales";
import Purchase from "@/pages/purchase/Purchase";
import Productions from "@/pages/productions/Productions";
import Materials from "@/pages/materials/Materials";
import { Routes, Route } from "react-router-dom";
import Customers from "@/pages/customers/Customer";
import Payments from "@/pages/payments/Payments";
import Suppliers from "@/pages/suppliers/Suppliers";
import SupplierPayments from "@/pages/supplier_payments/SupplierPayment";

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
        <Route path="payments" element={<Payments />} />
        <Route path="productions" element={<Productions />} />
        <Route path="materials" element={<Materials />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="supplier_payments" element={<SupplierPayments />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<p>Not Found</p>} />
    </Routes>
  );
}

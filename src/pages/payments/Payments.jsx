import { useMemo, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

// --- DUMMY DATA ---
// This data is copied from your SalesPage.jsx for demonstration.
// In a real app, you would import this from a shared location.
import { SALES } from "@/lib/data";
// --- END DUMMY DATA ---

function Payments() {
  const { isMobile, open } = useSidebar();
  const [sales] = useState(SALES);
  const [search, setSearch] = useState("");

  // Compute aggregated data for each customer
  const customerTotals = useMemo(() => {
    const totalsMap = new Map();

    // Filter out cancelled sales from payment totals
    const validSales = sales.filter((s) => s.status !== "cancelled");

    for (const sale of validSales) {
      const customer = sale.order?.customer;
      if (!customer) continue;

      const customerId = customer.id;
      if (!totalsMap.has(customerId)) {
        totalsMap.set(customerId, {
          id: customerId,
          name: customer.name,
          totalAmount: 0,
          paidAmount: 0,
          dueAmount: 0,
        });
      }

      const current = totalsMap.get(customerId);
      current.totalAmount += sale.totalAmount || 0;
      current.paidAmount += sale.paidAmount || 0;
      current.dueAmount += sale.dueAmount || 0;
    }

    return Array.from(totalsMap.values());
  }, [sales]);

  // Calculate grand totals for the footer
  const grandTotals = useMemo(() => {
    return customerTotals.reduce(
      (acc, customer) => {
        acc.totalAmount += customer.totalAmount;
        acc.paidAmount += customer.paidAmount;
        acc.dueAmount += customer.dueAmount;
        return acc;
      },
      { totalAmount: 0, paidAmount: 0, dueAmount: 0 }
    );
  }, [customerTotals]);

  // Filtered list based on search
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return customerTotals;
    return customerTotals.filter((c) =>
      [
        c.name,
        String(c.totalAmount),
        String(c.paidAmount),
        String(c.dueAmount),
      ].some((v) => String(v).toLowerCase().includes(term))
    );
  }, [customerTotals, search]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Payments</h1>
      <p>Summary of total, paid, and due amounts for each customer.</p>

      <div className="mt-4 flex items-center space-x-2">
        <InputGroup className="md:w-1/2">
          <InputGroupInput
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div
        className={`overflow-hidden mt-4 mb-4 rounded-lg border custom-scrollbar transition-all duration-300 ${
          isMobile
            ? "w-[calc(100vw-3rem)]"
            : open
            ? "w-[calc(100vw-19rem)]"
            : "w-[calc(100vw-3rem)]"
        }`}
      >
        <Table className="custom-scrollbar">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
              <TableHead className="text-right">Total Paid</TableHead>
              <TableHead className="text-right">Total Due</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No customer payment data found.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-right">
                  ₹ {c.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ₹ {c.paidAmount.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-right font-semibold ${
                    c.dueAmount > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ₹ {c.dueAmount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-bold">Grand Totals</TableCell>
              <TableCell className="text-right font-bold">
                ₹ {grandTotals.totalAmount.toFixed(2)}
              </TableCell>
              <TableCell className="text-right font-bold">
                ₹ {grandTotals.paidAmount.toFixed(2)}
              </TableCell>
              <TableCell className="text-right font-bold text-red-600">
                ₹ {grandTotals.dueAmount.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default Payments;

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
const DUMMY_PURCHASES = [
  {
    id: 1,
    supplier: { id: 1, name: "KK Supermart" },
    purchaseDate: "2025-01-01",
    totalAmount: 1200,
    paidAmount: 1200,
    dueAmount: 0,
    invoiceNumber: "INV-001",
    status: "paid",
  },
  {
    id: 2,
    supplier: { id: 2, name: "ABC Supermart" },
    purchaseDate: "2025-01-02",
    totalAmount: 1200,
    paidAmount: 500,
    dueAmount: 700,
    invoiceNumber: "INV-002",
    status: "partially-paid",
  },
  {
    id: 3,
    supplier: { id: 1, name: "KK Supermart" },
    purchaseDate: "2025-01-03",
    totalAmount: 2500,
    paidAmount: 0,
    dueAmount: 2500,
    invoiceNumber: "INV-003",
    status: "pending",
  },
  {
    id: 4,
    supplier: { id: 3, name: "Fresh Foods Ltd" },
    purchaseDate: "2025-01-04",
    totalAmount: 3500,
    paidAmount: 3500,
    dueAmount: 0,
    invoiceNumber: "INV-004",
    status: "paid",
  },
  {
    id: 5,
    supplier: { id: 2, name: "ABC Supermart" },
    purchaseDate: "2025-01-05",
    totalAmount: 1800,
    paidAmount: 800,
    dueAmount: 1000,
    invoiceNumber: "INV-005",
    status: "partially-paid",
  },
  {
    id: 6,
    supplier: { id: 3, name: "Fresh Foods Ltd" },
    purchaseDate: "2025-01-06",
    totalAmount: 4200,
    paidAmount: 0,
    dueAmount: 4200,
    invoiceNumber: "INV-006",
    status: "pending",
  },
  {
    id: 7,
    supplier: { id: 1, name: "KK Supermart" },
    purchaseDate: "2025-01-07",
    totalAmount: 1500,
    paidAmount: 1500,
    dueAmount: 0,
    invoiceNumber: "INV-007",
    status: "paid",
  },
];
// --- END DUMMY DATA ---

function SupplierPayments() {
  const { isMobile, open } = useSidebar();
  const [purchases] = useState(DUMMY_PURCHASES);
  const [search, setSearch] = useState("");

  // Compute aggregated data for each supplier
  const supplierTotals = useMemo(() => {
    const totalsMap = new Map();

    // Filter out cancelled purchases from payment totals
    const validPurchases = purchases.filter((p) => p.status !== "cancelled");

    for (const purchase of validPurchases) {
      const supplier = purchase.supplier;
      if (!supplier) continue;

      const supplierId = supplier.id;
      if (!totalsMap.has(supplierId)) {
        totalsMap.set(supplierId, {
          id: supplierId,
          name: supplier.name,
          totalAmount: 0,
          paidAmount: 0,
          dueAmount: 0,
        });
      }

      const current = totalsMap.get(supplierId);
      current.totalAmount += purchase.totalAmount || 0;
      current.paidAmount += purchase.paidAmount || 0;
      current.dueAmount += purchase.dueAmount || 0;
    }

    return Array.from(totalsMap.values());
  }, [purchases]);

  // Calculate grand totals for the footer
  const grandTotals = useMemo(() => {
    return supplierTotals.reduce(
      (acc, supplier) => {
        acc.totalAmount += supplier.totalAmount;
        acc.paidAmount += supplier.paidAmount;
        acc.dueAmount += supplier.dueAmount;
        return acc;
      },
      { totalAmount: 0, paidAmount: 0, dueAmount: 0 }
    );
  }, [supplierTotals]);

  // Filtered list based on search
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return supplierTotals;
    return supplierTotals.filter((s) =>
      [
        s.name,
        String(s.totalAmount),
        String(s.paidAmount),
        String(s.dueAmount),
      ].some((v) => String(v).toLowerCase().includes(term))
    );
  }, [supplierTotals, search]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Supplier Payments</h1>
      <p>Summary of total, paid, and due amounts for each supplier.</p>

      <div className="mt-4 flex items-center space-x-2">
        <InputGroup className="md:w-1/2">
          <InputGroupInput
            placeholder="Search suppliers..."
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
              <TableHead>Supplier Name</TableHead>
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
                  No supplier payment data found.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell className="text-right">
                  ₹ {s.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ₹ {s.paidAmount.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-right font-semibold ${
                    s.dueAmount > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ₹ {s.dueAmount.toFixed(2)}
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

export default SupplierPayments;

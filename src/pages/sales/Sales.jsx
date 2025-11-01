import { useMemo, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ResponsiveDrawerDialog } from "@/components/custom/responsiveDrawerDialog";
import { Ellipsis, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SalesForm from "./SalesForm"; // Import the new form

// --- DUMMY DATA ---
// This data would normally come from your app's state or API
const DUMMY_ORDERS = [
  {
    id: 1,
    customer: { id: 1, name: "Sunrise Bakery" },
    deliveryDate: "2025-11-05",
    orderNumber: "OD-001",
    productions: [
      {
        id: 1,
        name: "Chocolate Cake",
        unit: "piece",
        quantity: 5,
        price: 1200,
      },
      { id: 2, name: "Shawarma", unit: "piece", quantity: 50, price: 250 },
    ],
    totalPrice: 18500,
    status: "in-progress",
  },
  {
    id: 2,
    customer: { id: 2, name: "City Snacks" },
    deliveryDate: "2025-11-08",
    orderNumber: "OD-002",
    productions: [
      {
        id: 1,
        name: "Chocolate Cake",
        unit: "piece",
        quantity: 10,
        price: 1200,
      },
    ],
    totalPrice: 12000,
    status: "request-material",
  },
  {
    id: 3,
    customer: { id: 3, name: "Green Valley Cafe" },
    deliveryDate: "2025-11-10",
    orderNumber: "OD-003",
    productions: [
      { id: 4, name: "Spring Roll", unit: "piece", quantity: 100, price: 80 },
    ],
    totalPrice: 8000,
    status: "material-received",
  },
];

const SALES_STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-500" },
  "partially-paid": { label: "Partially Paid", color: "bg-blue-500" },
  paid: { label: "Paid", color: "bg-green-500" },
  cancelled: { label: "Cancelled", color: "bg-red-500" },
};

// --- NEW DUMMY SALES DATA ---
const DUMMY_SALES = [
  {
    id: 1,
    order: DUMMY_ORDERS[0],
    salesDate: "2025-11-05",
    productions: DUMMY_ORDERS[0].productions,
    totalAmount: 18500,
    paidAmount: 18500,
    dueAmount: 0,
    status: "paid",
  },
  {
    id: 2,
    order: DUMMY_ORDERS[1],
    salesDate: "2025-11-08",
    productions: DUMMY_ORDERS[1].productions,
    totalAmount: 12000,
    paidAmount: 5000,
    dueAmount: 7000,
    status: "partially-paid",
  },
  {
    id: 3,
    order: DUMMY_ORDERS[2],
    salesDate: "2025-11-10",
    productions: DUMMY_ORDERS[2].productions,
    totalAmount: 8000,
    paidAmount: 0,
    dueAmount: 8000,
    status: "pending",
  },
  {
    id: 4,
    order: DUMMY_ORDERS[0], // Repeat customer
    salesDate: "2025-11-12",
    productions: DUMMY_ORDERS[0].productions,
    totalAmount: 18500,
    paidAmount: 18500,
    dueAmount: 0,
    status: "paid",
  },
  {
    id: 5,
    order: DUMMY_ORDERS[1],
    salesDate: "2025-11-13",
    productions: DUMMY_ORDERS[1].productions,
    totalAmount: 12000,
    paidAmount: 0,
    dueAmount: 12000,
    status: "cancelled",
  },
  {
    id: 6,
    order: DUMMY_ORDERS[2],
    salesDate: "2025-11-14",
    productions: DUMMY_ORDERS[2].productions,
    totalAmount: 8000,
    paidAmount: 2000,
    dueAmount: 6000,
    status: "partially-paid",
  },
  {
    id: 7,
    order: DUMMY_ORDERS[0],
    salesDate: "2025-11-15",
    productions: DUMMY_ORDERS[0].productions,
    totalAmount: 18500,
    paidAmount: 0,
    dueAmount: 18500,
    status: "pending",
  },
];
// --- END DUMMY DATA ---

function Sales() {
  const { isMobile, open } = useSidebar();

  // We will use DUMMY_ORDERS as the prop for the SalesForm
  const [orders] = useState(DUMMY_ORDERS);

  // State for recorded sales, now initialized with dummy data
  const [sales, setSales] = useState(DUMMY_SALES);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return sales;
    return sales.filter((s) =>
      [
        s.order?.customer?.name,
        s.order?.orderNumber,
        s.salesDate,
        String(s.totalAmount),
        SALES_STATUS_CONFIG[s.status]?.label,
      ].some((v) => String(v).toLowerCase().includes(term))
    );
  }, [sales, search]);

  const handleAdd = () => {
    setSelected(null);
    setDialogOpen(true);
  };

  const handleEdit = (item) => {
    setSelected(item);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setSales((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = (values) => {
    if (selected) {
      setSales((prev) =>
        prev.map((s) => (s.id === selected.id ? { ...s, ...values } : s))
      );
    } else {
      const nextId = (sales.at(-1)?.id || 0) + 1;
      setSales((prev) => [...prev, { id: nextId, ...values }]);
    }
    setDialogOpen(false);
    setSelected(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales</h1>
      <p>Record sales based on customer orders and track payments.</p>

      <div className="mt-4 flex items-center space-x-2">
        <InputGroup className="md:w-1/2">
          <InputGroupInput
            placeholder="Search sales..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <Button className="ms-auto" size="sm" onClick={handleAdd}>
          Add Sale
        </Button>
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
              <TableHead>Order NO</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Sales Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Paid Amount</TableHead>
              <TableHead>Due Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
                  No sales recorded yet.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">
                  {s.order?.orderNumber || "N/A"}
                </TableCell>
                <TableCell>{s.order?.customer?.name || "N/A"}</TableCell>
                <TableCell>{s.salesDate}</TableCell>
                <TableCell>₹ {s.totalAmount.toFixed(2)}</TableCell>
                <TableCell>₹ {s.paidAmount.toFixed(2)}</TableCell>
                <TableCell
                  className={`font-semibold ${
                    s.dueAmount > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ₹ {s.dueAmount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      SALES_STATUS_CONFIG[s.status]?.color || "bg-gray-500"
                    } text-white`}
                  >
                    {SALES_STATUS_CONFIG[s.status]?.label || s.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"}>
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEdit(s)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(s.id)}
                        className={"text-destructive"}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* This dialog uses the new SalesForm */}
      <ResponsiveDrawerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={selected ? "Edit Sale" : "Add Sale"}
        description={
          selected
            ? "Update sale and payment details."
            : "Create a new sale from an order."
        }
        size="xl"
      >
        <SalesForm
          sale={selected}
          orders={orders} // Pass the list of orders to the form
          onCancel={() => setDialogOpen(false)}
          onSave={handleSave}
        />
      </ResponsiveDrawerDialog>
    </div>
  );
}

export default Sales;

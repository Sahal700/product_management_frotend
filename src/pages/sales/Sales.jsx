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
import { ORDERS, SALES } from "@/lib/data";

// --- DUMMY DATA --

const SALES_STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-500" },
  "partially-paid": { label: "Partially Paid", color: "bg-blue-500" },
  paid: { label: "Paid", color: "bg-green-500" },
  cancelled: { label: "Cancelled", color: "bg-red-500" },
};

// --- END DUMMY DATA ---

function Sales() {
  const { isMobile, open } = useSidebar();

  // We will use DUMMY_ORDERS as the prop for the SalesForm
  const [orders] = useState(ORDERS);

  // State for recorded sales, now initialized with dummy data
  const [sales, setSales] = useState(SALES);
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
    const index = SALES.findIndex((m) => m.id === id);
    if (index !== -1) SALES.splice(index, 1);
  };

  const handleSave = (values) => {
    if (selected) {
      setSales((prev) =>
        prev.map((s) => (s.id === selected.id ? { ...s, ...values } : s))
      );
      const index = SALES.findIndex((m) => m.id === selected.id);
      if (index !== -1) {
        SALES[index] = {
          ...SALES[index],
          ...values,
        };
      }
    } else {
      const nextId = (sales.at(-1)?.id || 0) + 1;
      setSales((prev) => [...prev, { id: nextId, ...values }]);
      SALES.push({ id: nextId, ...values });
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

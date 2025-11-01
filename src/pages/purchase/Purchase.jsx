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
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PurchaseForm from "./PurchaseForm";

const PURCHASE_STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-500" },
  "partially-paid": { label: "Partially Paid", color: "bg-blue-500" },
  paid: { label: "Paid", color: "bg-green-500" },
  cancelled: { label: "Cancelled", color: "bg-red-500" },
};

function Purchase() {
  const { isMobile, open } = useSidebar();

  const [purchases, setPurchases] = useState([
    {
      id: 1,
      supplier: { id: 1, name: "KK Supermart" },
      purchaseDate: "2025-01-01",
      totalAmount: 1200,
      paidAmount: 1200,
      dueAmount: 0,
      invoiceNumber: "INV-001",
      status: "paid",
      materials: [
        {
          id: 2,
          name: "Flour (All-purpose)",
          quantity: 100,
          unit: "kg",
          unitPrice: 10,
        },
        {
          id: 3,
          name: "Sugar (Granulated)",
          quantity: 20,
          unit: "pack",
          unitPrice: 10,
        },
      ],
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
      materials: [
        {
          id: 2,
          name: "Flour (All-purpose)",
          quantity: 100,
          unit: "kg",
          unitPrice: 10,
        },
        {
          id: 3,
          name: "Sugar (Granulated)",
          quantity: 20,
          unit: "pack",
          unitPrice: 10,
        },
      ],
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
      materials: [
        {
          id: 4,
          name: "Chicken (Breast)",
          quantity: 50,
          unit: "kg",
          unitPrice: 50,
        },
      ],
    },
  ]);

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return purchases;
    return purchases.filter((p) =>
      [
        p.supplier?.name,
        p.purchaseDate,
        p.invoiceNumber,
        String(p.totalAmount),
        PURCHASE_STATUS_CONFIG[p.status]?.label,
      ].some((v) => String(v).toLowerCase().includes(term))
    );
  }, [purchases, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const handleAdd = () => {
    setSelected(null);
    setDialogOpen(true);
  };

  const handleEdit = (item) => {
    setSelected(item);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setPurchases((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (values) => {
    if (selected) {
      setPurchases((prev) =>
        prev.map((p) => (p.id === selected.id ? { ...p, ...values } : p))
      );
    } else {
      const nextId = (purchases.at(-1)?.id || 0) + 1;
      setPurchases((prev) => [...prev, { id: nextId, ...values }]);
    }
    setDialogOpen(false);
    setSelected(null);
  };

  const handleFirstPage = () => setCurrentPage(1);
  const handlePreviousPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  const handleLastPage = () => setCurrentPage(totalPages);
  if (currentPage > totalPages) setCurrentPage(1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Purchase</h1>
      <p>Record material purchases from suppliers and track payments.</p>

      <div className="mt-4 flex items-center space-x-2">
        <InputGroup className="md:w-1/2">
          <InputGroupInput
            placeholder="Search purchase..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <Button className="ms-auto" size="sm" onClick={handleAdd}>
          Add purchase
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
              <TableHead>Invoice NO</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Paid Amount</TableHead>
              <TableHead>Due Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Materials</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-muted-foreground"
                >
                  No purchases found.
                </TableCell>
              </TableRow>
            )}
            {paged.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.invoiceNumber}</TableCell>
                <TableCell>{p.supplier?.name || "N/A"}</TableCell>
                <TableCell>{p.purchaseDate}</TableCell>
                <TableCell>₹ {p.totalAmount.toFixed(2)}</TableCell>
                <TableCell>₹ {p.paidAmount.toFixed(2)}</TableCell>
                <TableCell
                  className={`font-semibold ${
                    p.dueAmount > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ₹ {p.dueAmount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      PURCHASE_STATUS_CONFIG[p.status]?.color || "bg-gray-500"
                    } text-white`}
                  >
                    {PURCHASE_STATUS_CONFIG[p.status]?.label || p.status}
                  </Badge>
                </TableCell>
                <TableCell>{p.materials?.length || 0} items</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"}>
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEdit(p)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(p.id)}
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

      <div className="flex">
        <div className="ms-auto flex space-x-2 items-center">
          <p className="me-8 text-sm font-semibold">
            Page {currentPage} of {totalPages}
          </p>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>

      <ResponsiveDrawerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={selected ? "Edit Purchase" : "Add Purchase"}
        description={
          selected
            ? "Update purchase and payment details."
            : "Add a new purchase from supplier."
        }
        size="xl"
      >
        <PurchaseForm
          purchase={selected}
          onCancel={() => setDialogOpen(false)}
          onSave={handleSave}
        />
      </ResponsiveDrawerDialog>
    </div>
  );
}

export default Purchase;

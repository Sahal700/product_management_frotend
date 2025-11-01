import { useMemo, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
import {
  Ellipsis,
  Search,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import OrderForm from "./OrderForm";
import { MATERIALS_CATALOG, PRODUCTION_RECIPES } from "@/lib/data";

const STATUS_CONFIG = {
  "request-material": { label: "Request Material", color: "bg-yellow-500" },
  "material-sent": { label: "Material Sent", color: "bg-blue-500" },
  "material-received": { label: "Material Received", color: "bg-purple-500" },
  "in-progress": { label: "In Progress", color: "bg-orange-500" },
  completed: { label: "Completed", color: "bg-green-500" },
  cancelled: { label: "Cancelled", color: "bg-red-500" },
};

function Orders() {
  const { isMobile, open } = useSidebar();

  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: { id: 1, name: "Sunrise Bakery" },
      deliveryDate: "2025-11-05",
      orderNumber: "OD-001",
      productions: [
        { id: 1, name: "Chocolate Cake", quantity: 5, price: 1200 },
        { id: 2, name: "Shawarma", quantity: 50, price: 250 },
      ],
      totalPrice: 18500,
      totalCost: 10250,
      status: "in-progress",
    },
    {
      id: 2,
      customer: { id: 2, name: "City Snacks" },
      deliveryDate: "2025-11-08",
      orderNumber: "OD-002",
      productions: [
        { id: 1, name: "Chocolate Cake", quantity: 10, price: 1200 },
      ],
      totalPrice: 12000,
      totalCost: 6500,
      status: "request-material",
    },
    {
      id: 3,
      customer: { id: 3, name: "Green Valley Cafe" },
      deliveryDate: "2025-11-10",
      orderNumber: "OD-003",
      productions: [{ id: 4, name: "Spring Roll", quantity: 100, price: 80 }],
      totalPrice: 8000,
      totalCost: 4500,
      status: "material-received",
    },
  ]);

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const [selectedOrderMaterials, setSelectedOrderMaterials] = useState({
    order: null, // Holds the order object
    materials: [], // Holds the aggregated materials
    totalCost: 0, // Holds the total material cost
    dialogOpen: false, // Controls the visibility of the materials dialog
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter((o) =>
      [
        o.customer?.name,
        o.deliveryDate,
        String(o.totalPrice),
        STATUS_CONFIG[o.status]?.label,
      ].some((v) => String(v).toLowerCase().includes(term))
    );
  }, [orders, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const handleShowMaterials = (order) => {
    const materialsMap = new Map();
    let grandTotalCost = 0;

    for (const production of order.productions || []) {
      const orderQuantity = parseFloat(production.quantity) || 0;
      if (orderQuantity === 0) continue;

      const recipe = PRODUCTION_RECIPES[production.id];
      if (!recipe) continue;

      for (const recipeMaterial of recipe) {
        const materialId = recipeMaterial.materialId;
        const quantityPerUnit = recipeMaterial.quantity;

        const materialInfo = MATERIALS_CATALOG.find((m) => m.id === materialId);
        if (!materialInfo) continue;

        const totalMaterialNeeded = quantityPerUnit * orderQuantity;
        const materialCost =
          totalMaterialNeeded * (materialInfo.unitPrice || 0);

        if (!materialsMap.has(materialId)) {
          materialsMap.set(materialId, {
            ...materialInfo,
            totalQuantity: 0,
            totalCost: 0,
          });
        }

        const currentMaterial = materialsMap.get(materialId);
        currentMaterial.totalQuantity += totalMaterialNeeded;
        currentMaterial.totalCost += materialCost;
        grandTotalCost += materialCost;
      }
    }

    setSelectedOrderMaterials({
      order: order,
      materials: Array.from(materialsMap.values()),
      totalCost: grandTotalCost,
      dialogOpen: true,
    });
  };

  const handleAdd = () => {
    setSelected(null);
    setDialogOpen(true);
  };

  const handleEdit = (item) => {
    setSelected(item);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleSave = (values) => {
    if (selected) {
      setOrders((prev) =>
        prev.map((o) => (o.id === selected.id ? { ...o, ...values } : o))
      );
    } else {
      const nextId = (orders.at(-1)?.id || 0) + 1;
      setOrders((prev) => [...prev, { id: nextId, ...values }]);
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
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <p>Manage catering orders with delivery dates and status tracking.</p>

      <div className="mt-4 flex items-center space-x-2">
        <InputGroup className="md:w-1/2">
          <InputGroupInput
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <Button className="ms-auto" size="sm" onClick={handleAdd}>
          Add order
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
              <TableHead>Customer</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Order NO</TableHead>
              <TableHead>Productions</TableHead>
              <TableHead>Total Price</TableHead>
              {/* <TableHead>Total Cost</TableHead> */}
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">
                  {o.customer?.name || "N/A"}
                </TableCell>
                <TableCell>{o.deliveryDate}</TableCell>
                <TableCell>{o.orderNumber}</TableCell>
                <TableCell>{o.productions?.length || 0} items</TableCell>
                <TableCell>₹ {o.totalPrice.toFixed(2)}</TableCell>
                {/* <TableCell>₹ {o.totalCost.toFixed(2)}</TableCell> */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-auto p-0">
                        <Badge
                          className={`${
                            STATUS_CONFIG[o.status]?.color || "bg-gray-500"
                          } text-white hover:opacity-80 cursor-pointer`}
                        >
                          {STATUS_CONFIG[o.status]?.label || o.status}
                        </Badge>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                        <DropdownMenuItem
                          key={key}
                          onClick={() => handleStatusChange(o.id, key)}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${config.color}`}
                            ></div>
                            {config.label}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"}>
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEdit(o)}>
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleDelete(o.id)}
                        className={"text-destructive"}
                      >
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleShowMaterials(o)}
                        className="font-semibold text-blue-600"
                      >
                        Total Materials
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
        title={selected ? "Edit Order" : "Add Order"}
        description={
          selected ? "Update order details" : "Create a new catering order"
        }
        size="xl"
      >
        <OrderForm
          order={selected}
          onCancel={() => setDialogOpen(false)}
          onSave={handleSave}
        />
      </ResponsiveDrawerDialog>

      <ResponsiveDrawerDialog
        open={selectedOrderMaterials.dialogOpen}
        onOpenChange={(open) =>
          setSelectedOrderMaterials((prev) => ({ ...prev, dialogOpen: open }))
        }
        title={`Required Materials for Order #${
          selectedOrderMaterials.order?.id || "N/A"
        }`}
        description={`Customer: ${
          selectedOrderMaterials.order?.customer?.name || "N/A"
        } (Delivery: ${selectedOrderMaterials.order?.deliveryDate || "N/A"})`}
        size="lg"
      >
        <div className="rounded-lg border mt-4">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Total Quantity</TableHead>
                <TableHead className="text-right">Total Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedOrderMaterials.materials.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground"
                  >
                    No materials required for this order.
                  </TableCell>
                </TableRow>
              ) : (
                selectedOrderMaterials.materials.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell>
                      **{m.totalQuantity.toFixed(2)}** {m.unit}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹ {m.totalCost.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            {selectedOrderMaterials.materials.length > 0 && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="text-right font-semibold">
                    Order Material Grand Total
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹ {selectedOrderMaterials.totalCost.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() =>
              setSelectedOrderMaterials((prev) => ({
                ...prev,
                dialogOpen: false,
              }))
            }
          >
            Close
          </Button>
        </div>
      </ResponsiveDrawerDialog>
    </div>
  );
}

export default Orders;

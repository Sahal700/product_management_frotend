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
import { Ellipsis, SearchIcon } from "lucide-react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import SupplierForm from "./SupplierForm";

function Suppliers() {
  const { isMobile, open } = useSidebar();

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "KK Supermart",
      phone: "+91 98765 43210",
      email: "info@kksupermart.com",
      address: "Main Road, Kochi",
    },
    {
      id: 2,
      name: "ABC Supermart",
      phone: "+91 87654 32109",
      email: "contact@abcsupermart.com",
      address: "Market Street, Calicut",
    },
  ]);

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return suppliers;
    return suppliers.filter((s) =>
      [s.name, s.phone, s.email, s.address].some((v) =>
        String(v).toLowerCase().includes(term)
      )
    );
  }, [suppliers, search]);

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
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = (values) => {
    if (selected) {
      setSuppliers((prev) =>
        prev.map((s) => (s.id === selected.id ? { ...s, ...values } : s))
      );
    } else {
      const nextId = (suppliers.at(-1)?.id || 0) + 1;
      setSuppliers((prev) => [...prev, { id: nextId, ...values }]);
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
      <h1 className="text-2xl font-bold mb-4">Suppliers</h1>

      <div className="mt-4 flex items-center space-x-2">
        <InputGroup className="md:w-1/2">
          <InputGroupInput
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <Button className="ms-auto" size="sm" onClick={handleAdd}>
          Add Supplier
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
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.phone}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.address}</TableCell>
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
        title={selected ? "Edit Supplier" : "Add Supplier"}
        description={
          selected ? "Update supplier details" : "Add a new supplier"
        }
        size="lg"
      >
        <SupplierForm
          supplier={selected}
          onCancel={() => setDialogOpen(false)}
          onSave={handleSave}
        />
      </ResponsiveDrawerDialog>
    </div>
  );
}

export default Suppliers;

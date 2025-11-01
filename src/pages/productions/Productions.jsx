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
import ProductionForm from "./ProductionForm";

import { PRODUCTS } from "@/lib/data";

function Productions() {
  const { isMobile, open } = useSidebar();

  // Dummy productions
  const [productions, setProductions] = useState(PRODUCTS);

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return productions;
    return productions.filter((p) =>
      [p.name, p.unit, String(p.price), String(p.totalCost)].some((v) =>
        String(v).toLowerCase().includes(term)
      )
    );
  }, [productions, search]);

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
    setProductions((prev) => prev.filter((p) => p.id !== id));
    const index = PRODUCTS.findIndex((m) => m.id === id);
    if (index !== -1) PRODUCTS.splice(index, 1);
    if (PRODUCTION_RECIPES[id]) {
      delete PRODUCTION_RECIPES[id];
    }
  };

  const handleSave = (values) => {
    if (selected) {
      setProductions((prev) =>
        prev.map((p) => (p.id === selected.id ? { ...p, ...values } : p))
      );
      const index = PRODUCTS.findIndex((m) => m.id === selected.id);
      if (index !== -1) {
        PRODUCTS[index] = {
          ...PRODUCTS[index],
          ...values,
        };
      }
    } else {
      const nextId = (productions.at(-1)?.id || 0) + 1;
      setProductions((prev) => [...prev, { id: nextId, ...values }]);
      PRODUCTS.push({ id: nextId, ...values });
      // Initialize empty recipe entry
      PRODUCTION_RECIPES[nextId] = [];
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
      <h1 className="text-2xl font-bold mb-4">Productions</h1>

      <div className="mt-4 flex items-center space-x-2">
        <InputGroup className="md:w-1/2">
          <InputGroupInput
            placeholder="Search productions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <Button className="ms-auto" size="sm" onClick={handleAdd}>
          Add production
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
              <TableHead>Unit</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Materials</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.unit}</TableCell>
                <TableCell className="font-semibold">₹ {p.price}</TableCell>
                <TableCell className="text-orange-500 font-semibold">
                  ₹ {p.totalCost}
                </TableCell>
                <TableCell>{p.materials?.length || 0}</TableCell>
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
        title={selected ? "Edit Production" : "Add Production"}
        description={
          selected
            ? "Update production details and BOM"
            : "Add a new production with materials"
        }
        size="xl"
      >
        <ProductionForm
          production={selected}
          onCancel={() => setDialogOpen(false)}
          onSave={handleSave}
        />
      </ResponsiveDrawerDialog>
    </div>
  );
}

export default Productions;

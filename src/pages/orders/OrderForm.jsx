import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

import {
  CUSTOMERS,
  PRODUCTS,
  MATERIALS_CATALOG,
  PRODUCTION_RECIPES,
} from "@/lib/data";

const STATUS_OPTIONS = [
  { value: "request-material", label: "Request Material" },
  { value: "material-sent", label: "Material Sent" },
  { value: "material-received", label: "Material Received" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

function OrderForm({ order, onCancel, onSave }) {
  const isEdit = !!order;

  const [customerId, setCustomerId] = useState(
    String(order?.customer?.id || "")
  );
  const [deliveryDate, setDeliveryDate] = useState(order?.deliveryDate || "");
  const [orderNumber, setOrderNumber] = useState(order?.orderNumber || "");
  const [productions, setproductions] = useState(
    (order?.productions || []).map((p) => ({
      id: p.id,
      name: p.name,
      unit: p.unit || "piece",
      quantity: String(p.quantity || 1),
      price: p.price || 0,
      cost: p.cost || 0,
    }))
  );
  const [totalPrice, setTotalPrice] = useState(String(order?.totalPrice || ""));
  const [status, setStatus] = useState(order?.status || "request-material");
  const [selectedproductionIndex, setSelectedproductionIndex] = useState(null);

  const displayedMaterials = useMemo(() => {
    if (selectedproductionIndex === null) {
      return [];
    }

    const selectedproduction = productions[selectedproductionIndex];
    if (!selectedproduction) {
      return [];
    }

    const orderQuantity = parseFloat(selectedproduction.quantity) || 0;
    if (orderQuantity === 0) {
      return [];
    }

    const recipe = PRODUCTION_RECIPES[selectedproduction.id];
    if (!recipe) {
      return [];
    }

    return recipe
      .map((recipeMaterial) => {
        const materialInfo = MATERIALS_CATALOG.find(
          (m) => m.id === recipeMaterial.materialId
        );
        if (!materialInfo) return null;

        const totalMaterialNeeded = recipeMaterial.quantity * orderQuantity;

        return {
          ...materialInfo,
          totalQuantity: totalMaterialNeeded,
        };
      })
      .filter(Boolean);
  }, [productions, selectedproductionIndex]);

  const totalMaterialCost = useMemo(() => {
    return displayedMaterials.reduce((sum, material) => {
      const cost = (material.unitPrice || 0) * (material.totalQuantity || 0);
      return sum + cost;
    }, 0);
  }, [displayedMaterials]);

  useEffect(() => {
    const subtotal = productions.reduce(
      (sum, p) => sum + Number(p.price || 0) * (parseFloat(p.quantity) || 0),
      0
    );
    setTotalPrice(subtotal.toFixed(2));
  }, [productions]);

  const addproductionRow = (productionId) => {
    const found = PRODUCTS.find((p) => p.id === productionId);
    if (!found) return;
    setproductions((prev) => [
      ...prev,
      {
        id: found.id,
        name: found.name,
        unit: found.unit,
        quantity: "1",
        price: found.price,
        cost: found.cost,
      },
    ]);
  };

  const updateproductionAt = (idx, updater) => {
    setproductions((prev) => prev.map((p, i) => (i === idx ? updater(p) : p)));
  };

  const removeproductionAt = (idx) => {
    setproductions((prev) => prev.filter((_, i) => i !== idx));

    setSelectedproductionIndex((prev) => {
      if (prev === null) return null;
      if (prev === idx) return null;
      if (prev > idx) return prev - 1;
      return prev;
    });
  };

  const handleQuantityChange = (idx, value) => {
    updateproductionAt(idx, (p) => ({ ...p, quantity: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCustomer = CUSTOMERS.find((c) => c.id === Number(customerId));
    const payload = {
      customer: selectedCustomer || { id: Number(customerId), name: "Unknown" },
      deliveryDate,
      orderNumber,
      productions: productions.map((p) => ({
        id: p.id,
        name: p.name,
        unit: p.unit,
        quantity: Number(p.quantity) || 0,
        price: Number(p.price) || 0,
        cost: Number(p.cost) || 0,
      })),
      totalPrice: Number(totalPrice) || 0,
      status,
    };
    onSave?.(payload);
  };

  const selectedproductionName =
    selectedproductionIndex !== null
      ? productions[selectedproductionIndex]?.name
      : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Customer</FieldLabel>
          <Select value={customerId} onValueChange={setCustomerId} required>
            <SelectTrigger>
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              {CUSTOMERS.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="deliveryDate">Delivery Date</FieldLabel>
          <Input
            id="deliveryDate"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="orderNumber">Order NO</FieldLabel>
          <Input
            id="orderNumber"
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
          />
        </Field>

        <Field>
          <FieldLabel>Status</FieldLabel>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <div className="pt-2">
          <div className="flex items-center justify-between mb-2 gap-3">
            <h3 className="text-base font-semibold min-w-fit">Productions</h3>
            <div className="w-full">
              <Select
                onValueChange={(v) => {
                  const id = parseInt(v);
                  if (!Number.isNaN(id)) addproductionRow(id);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add production..." />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCTS.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.name} - ₹{p.price}/{p.unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-[35%]">Production</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productions.map((p, idx) => {
                  const subtotal =
                    Number(p.price || 0) * (parseFloat(p.quantity) || 0);
                  return (
                    <TableRow key={idx}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>₹ {p.price}</TableCell>
                      <TableCell>
                        <InputGroup>
                          <InputGroupInput
                            className="min-w-20"
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.01"
                            value={p.quantity}
                            onChange={(e) =>
                              handleQuantityChange(idx, e.target.value)
                            }
                            onFocus={() => setSelectedproductionIndex(idx)}
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupText>{p.unit}</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </TableCell>
                      <TableCell>₹ {subtotal.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeproductionAt(idx);
                          }}
                          aria-label="Remove production"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {productions.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-sm text-muted-foreground"
                    >
                      No productions added. Click "Add production" to start.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="pt-4">
            <h3 className="text-base font-semibold mb-2">
              Required Materials{" "}
              {selectedproductionName ? `for ${selectedproductionName}` : ""}
            </h3>
            <div className="rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Required Quantity</TableHead>
                    <TableHead>Estimated Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedMaterials.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center text-sm text-muted-foreground"
                      >
                        {selectedproductionName
                          ? "No materials listed for this production."
                          : "Click a production quantity field to see its materials."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayedMaterials.map((material) => {
                      const materialCost =
                        (material.unitPrice || 0) * material.totalQuantity;
                      return (
                        <TableRow key={material.id}>
                          <TableCell>{material.name}</TableCell>
                          <TableCell>
                            {material.totalQuantity.toFixed(2)} {material.unit}
                          </TableCell>
                          <TableCell>₹ {materialCost.toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
                {displayedMaterials.length > 0 && (
                  <TableFooter>
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        className="text-right font-semibold"
                      >
                        Total Material Cost
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹ {totalMaterialCost.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </div>
          </div>
        </div>

        <Field>
          <FieldLabel htmlFor="totalPrice">Total Price</FieldLabel>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>₹</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="totalPrice"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              required
            />
          </InputGroup>
        </Field>

        <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{isEdit ? "Save Changes" : "Add Order"}</Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default OrderForm;

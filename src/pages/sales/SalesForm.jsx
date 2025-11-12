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

import { PRODUCTS } from "@/lib/data";

const SALES_STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "partially-paid", label: "Partially Paid" },
  { value: "paid", label: "Paid" },
];

function SalesForm({ sale, orders = [], onCancel, onSave }) {
  const isEdit = !!sale;

  const [selectedOrderId, setSelectedOrderId] = useState(
    String(sale?.order?.id || "")
  );
  const [salesDate, setSalesDate] = useState(
    sale?.salesDate || new Date().toISOString().split("T")[0] // Default to today
  );
  const [productions, setProductions] = useState(
    (sale?.productions || []).map((p) => ({
      id: p.id,
      name: p.name,
      unit: p.unit || "piece",
      quantity: String(p.quantity || 1),
      price: p.price || 0,
    }))
  );
  const [paidAmount, setPaidAmount] = useState(String(sale?.paidAmount || ""));
  const [status, setStatus] = useState(sale?.status || "pending");

  // Find the selected order object
  const selectedOrder = useMemo(() => {
    if (!selectedOrderId) return null;
    return orders.find((o) => o.id === Number(selectedOrderId));
  }, [selectedOrderId, orders]);

  // Effect to populate productions when an order is selected
  useEffect(() => {
    // Only populate if it's not an edit or if the order is changed
    if (isEdit && sale?.order?.id === Number(selectedOrderId)) return;

    if (selectedOrder) {
      setProductions(
        selectedOrder.productions.map((p) => ({
          id: p.id,
          name: p.name,
          unit: p.unit || "piece", // Ensure unit is carried over
          quantity: String(p.quantity || 1),
          price: p.price || 0,
        }))
      );
      // Reset payment when order changes
      setPaidAmount("0");
      setStatus("pending");
    } else {
      setProductions([]);
    }
  }, [selectedOrder, isEdit, sale?.order?.id, selectedOrderId]);

  // Calculate Total Amount
  const totalAmount = useMemo(() => {
    return productions.reduce(
      (sum, p) => sum + Number(p.price || 0) * (parseFloat(p.quantity) || 0),
      0
    );
  }, [productions]);

  // Calculate Due Amount
  const dueAmount = useMemo(() => {
    const total = totalAmount;
    const paid = parseFloat(paidAmount) || 0;
    return total - paid;
  }, [totalAmount, paidAmount]);

  // Handlers for productions table (copied from OrderForm)
  const addProductionRow = (productionId) => {
    const found = PRODUCTS.find((p) => p.id === productionId);
    if (!found) return;
    setProductions((prev) => [
      ...prev,
      {
        id: found.id,
        name: found.name,
        unit: found.unit,
        quantity: "1",
        price: found.price,
      },
    ]);
  };

  const updateProductionAt = (idx, updater) => {
    setProductions((prev) => prev.map((p, i) => (i === idx ? updater(p) : p)));
  };

  const removeProductionAt = (idx) => {
    setProductions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleQuantityChange = (idx, value) => {
    updateProductionAt(idx, (p) => ({ ...p, quantity: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      order: selectedOrder,
      salesDate,
      productions: productions.map((p) => ({
        id: p.id,
        name: p.name,
        unit: p.unit,
        quantity: Number(p.quantity) || 0,
        price: Number(p.price) || 0,
      })),
      totalAmount: totalAmount,
      paidAmount: Number(paidAmount) || 0,
      dueAmount: dueAmount,
      status,
    };
    onSave?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Select Order</FieldLabel>
          <Select
            value={selectedOrderId}
            onValueChange={setSelectedOrderId}
            required
            disabled={isEdit} // Disable changing order when editing
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an order..." />
            </SelectTrigger>
            <SelectContent>
              {orders.map((o) => (
                <SelectItem key={o.id} value={String(o.id)}>
                  {o.orderNumber} - {o.customer?.name} ({o.deliveryDate})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="salesDate">Sales Date</FieldLabel>
          <Input
            id="salesDate"
            type="date"
            value={salesDate}
            onChange={(e) => setSalesDate(e.target.value)}
            required
          />
        </Field>

        <div className="pt-2">
          <div className="flex items-center justify-between mb-2 gap-3">
            <h3 className="text-base font-semibold min-w-fit">
              Productions for Sale
            </h3>
            <div className="w-full">
              <Select
                onValueChange={(v) => {
                  const id = parseInt(v);
                  if (!Number.isNaN(id)) addProductionRow(id);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add new production..." />
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
                            removeProductionAt(idx);
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
                      {selectedOrderId
                        ? "No productions found."
                        : "Please select an order to see productions."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Payment Details Section */}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="totalAmount">Total Amount</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>₹</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="totalAmount"
                type="number"
                value={totalAmount.toFixed(2)}
                readOnly
                className="font-semibold"
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="paidAmount">Paid Amount</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>₹</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="paidAmount"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="dueAmount">Due Amount</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>₹</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="dueAmount"
                type="number"
                value={dueAmount.toFixed(2)}
                readOnly
                className={`font-semibold ${
                  dueAmount > 0 ? "text-red-600" : "text-green-600"
                }`}
              />
            </InputGroup>
          </Field>
        </FieldGroup>

        <Field>
          <FieldLabel>Sales Status</FieldLabel>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {SALES_STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? "Save Changes" : "Create Sale"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default SalesForm;

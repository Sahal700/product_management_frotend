import { useEffect, useState } from "react";
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

import { MATERIALS_CATALOG, SUPPLIERS } from "@/lib/data";

function PurchaseForm({ purchase, onCancel, onSave }) {
  const isEdit = !!purchase;

  const [supplierId, setSupplierId] = useState(
    String(purchase?.supplier?.id || "")
  );
  const [purchaseDate, setPurchaseDate] = useState(
    purchase?.purchaseDate || ""
  );
  const [invoiceNumber, setInvoiceNumber] = useState(
    purchase?.invoiceNumber || ""
  );
  const [totalPrice, setTotalPrice] = useState(
    String(purchase?.totalPrice ?? "")
  );
  const [materials, setMaterials] = useState(
    (purchase?.materials || []).map((m) => ({
      id: m.id,
      name: m.name,
      quantity: m.quantity,
      unit: m.unit,
      unitPrice: m.unitPrice,
    }))
  );

  const [addMaterialSelect, setAddMaterialSelect] = useState();

  useEffect(() => {
    const subtotal = materials.reduce(
      (sum, m) =>
        sum + Number(m.unitPrice || 0) * (parseFloat(m.quantity) || 0),
      0
    );
    setTotalPrice(subtotal.toFixed(2));
  }, [materials]);

  const addMaterialById = (materialId) => {
    const found = MATERIALS_CATALOG.find((m) => m.id === materialId);
    if (!found) return;
    if (materials.some((m) => m.id === found.id)) {
      // duplicate guard
      return;
    }
    setMaterials((prev) => [
      ...prev,
      {
        id: found.id,
        name: found.name,
        unit: found.unit,
        unitPrice: found.unitPrice,
        quantity: "1",
      },
    ]);
  };

  const updateMaterialAt = (idx, updater) => {
    setMaterials((prev) => prev.map((m, i) => (i === idx ? updater(m) : m)));
  };

  const removeMaterialAt = (idx) => {
    setMaterials((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleQuantityChange = (idx, value) => {
    updateMaterialAt(idx, (m) => ({ ...m, quantity: value }));
  };

  const handleUnitPriceChange = (idx, value) => {
    updateMaterialAt(idx, (m) => ({ ...m, unitPrice: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedSupplier = SUPPLIERS.find((s) => s.id === Number(supplierId));
    const payload = {
      supplier: selectedSupplier || { id: Number(supplierId), name: "Unknown" },
      purchaseDate: purchaseDate,
      invoiceNumber: invoiceNumber.trim(),
      totalPrice: Number(totalPrice) || 0,
      materials: materials.map((m) => ({
        id: m.id,
        name: m.name,
        unit: m.unit,
        unitPrice: Number(m.unitPrice) || 0,
        quantity: Number(m.quantity) || 0,
      })),
    };
    onSave?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Supplier</FieldLabel>
          <Select value={supplierId} onValueChange={setSupplierId} required>
            <SelectTrigger>
              <SelectValue placeholder="Select supplier" />
            </SelectTrigger>
            <SelectContent>
              {SUPPLIERS.map((s) => (
                <SelectItem key={s.id} value={String(s.id)}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="purchaseDate">Purchase date</FieldLabel>
          <Input
            id="purchaseDate"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="invoiceNumber">Invoice Number</FieldLabel>
          <Input
            id="invoiceNumber"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            placeholder="e.g., INV-001"
            required
          />
        </Field>

        <div className="pt-2">
          <div className="flex items-center justify-between mb-2 gap-3">
            <h3 className="text-base font-semibold min-w-fit">Add Materials</h3>
            <div className="w-full">
              <Select
                value={addMaterialSelect}
                onValueChange={(v) => {
                  const id = parseInt(v);
                  if (!Number.isNaN(id)) addMaterialById(id);
                  setAddMaterialSelect(undefined);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add material..." />
                </SelectTrigger>
                <SelectContent>
                  {MATERIALS_CATALOG.map((opt) => (
                    <SelectItem
                      key={opt.id}
                      value={opt.id.toString()}
                      disabled={materials.some((m) => m.id === opt.id)}
                    >
                      {opt.name}
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
                  <TableHead className="w-[30%]">Material</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Line Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((m, idx) => {
                  const lineTotal =
                    Number(m.unitPrice || 0) * (parseFloat(m.quantity) || 0);
                  return (
                    <TableRow key={idx}>
                      <TableCell>{m.name}</TableCell>
                      <TableCell>
                        <InputGroup>
                          <InputGroupAddon align="inline-start">
                            <InputGroupText>₹</InputGroupText>
                          </InputGroupAddon>
                          <InputGroupInput
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.01"
                            value={m.unitPrice}
                            onChange={(e) =>
                              handleUnitPriceChange(idx, e.target.value)
                            }
                          />
                        </InputGroup>
                      </TableCell>
                      <TableCell>
                        <InputGroup>
                          <InputGroupInput
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.01"
                            value={m.quantity}
                            onChange={(e) =>
                              handleQuantityChange(idx, e.target.value)
                            }
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupText>{m.unit}</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </TableCell>
                      <TableCell>₹ {lineTotal.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMaterialAt(idx)}
                          aria-label="Remove row"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {materials.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-sm text-muted-foreground"
                    >
                      No materials added. Click "Add material" to start.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
          <Button type="submit">
            {isEdit ? "Save Changes" : "Add Purchase"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default PurchaseForm;

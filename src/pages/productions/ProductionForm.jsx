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

import { MATERIALS_CATALOG } from "@/lib/data";

function ProductionForm({ production, onCancel, onSave }) {
  const isEdit = !!production;

  const [name, setName] = useState(production?.name || "");
  const [unit, setUnit] = useState(production?.unit || "piece");
  const [price, setPrice] = useState(String(production?.price ?? ""));
  const [materials, setMaterials] = useState(
    (production?.materials || []).map((m) => ({
      materialId: m.materialId,
      name: m.name,
      unit: m.unit,
      unitPrice: m.unitPrice,
      consumption: String(m.consumption ?? 1),
    }))
  );
  const [totalCost, setTotalCost] = useState(
    String(production?.totalCost ?? "")
  );

  const [addMaterialSelect, setAddMaterialSelect] = useState();

  useEffect(() => {
    const subtotal = materials.reduce(
      (sum, m) =>
        sum + Number(m.unitPrice || 0) * (parseFloat(m.consumption) || 0),
      0
    );
    setTotalCost(subtotal.toFixed(2));
  }, [materials]);

  const addMaterialById = (materialId) => {
    const found = MATERIALS_CATALOG.find((m) => m.id === materialId);
    if (!found) return;
    if (materials.some((m) => m.materialId === found.id)) {
      // duplicate guard
      return;
    }
    setMaterials((prev) => [
      ...prev,
      {
        materialId: found.id,
        name: found.name,
        unit: found.unit,
        unitPrice: found.unitPrice,
        consumption: "1",
      },
    ]);
  };

  const updateMaterialAt = (idx, updater) => {
    setMaterials((prev) => prev.map((m, i) => (i === idx ? updater(m) : m)));
  };

  const removeMaterialAt = (idx) => {
    setMaterials((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleMaterialSelect = (idx, materialIdStr) => {
    const materialId = parseInt(materialIdStr);
    const found = MATERIALS_CATALOG.find((m) => m.id === materialId);
    if (!found) return;
    if (materials.some((m, i) => i !== idx && m.materialId === found.id)) {
      // duplicate guard
      return;
    }
    updateMaterialAt(idx, () => ({
      materialId: found.id,
      name: found.name,
      unit: found.unit,
      unitPrice: found.unitPrice,
      consumption: 1,
    }));
  };

  const handleConsumptionChange = (idx, value) => {
    updateMaterialAt(idx, (m) => ({ ...m, consumption: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      unit,
      price: Number(price) || 0,
      totalCost: Number(totalCost) || 0,
      materials: materials.map((m) => ({
        materialId: m.materialId,
        name: m.name,
        unit: m.unit,
        unitPrice: Number(m.unitPrice) || 0,
        consumption: Number(m.consumption) || 0,
      })),
    };
    onSave?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Chocolate Cake"
            required
          />
        </Field>

        <Field>
          <FieldLabel>Unit</FieldLabel>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="piece">piece</SelectItem>
              <SelectItem value="pack">pack</SelectItem>
              <SelectItem value="kg">kg</SelectItem>
              <SelectItem value="g">g</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="price">Price</FieldLabel>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>₹</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="price"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 1200"
              required
            />
          </InputGroup>
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
                      disabled={materials.some((m) => m.materialId === opt.id)}
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
                  <TableHead className="w-[40%]">Material</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Consumption</TableHead>
                  <TableHead>Line Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((m, idx) => {
                  const lineTotal =
                    Number(m.unitPrice || 0) * (parseFloat(m.consumption) || 0);
                  return (
                    <TableRow key={idx}>
                      <TableCell>{m.name}</TableCell>
                      <TableCell>₹ {m.unitPrice}</TableCell>
                      <TableCell>
                        <InputGroup>
                          <InputGroupInput
                            className="min-w-20"
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.01"
                            value={m.consumption}
                            onChange={(e) =>
                              handleConsumptionChange(idx, e.target.value)
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
          <FieldLabel htmlFor="totalCost">Total Cost</FieldLabel>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>₹</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="totalCost"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              readOnly
              required
            />
          </InputGroup>
        </Field>

        <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? "Save Changes" : "Add Production"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default ProductionForm;

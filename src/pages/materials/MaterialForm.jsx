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

function MaterialForm({ material, onCancel, onSave }) {
  const isEdit = !!material;
  const [name, setName] = useState(material?.name || "");
  const [unitPrice, setunitPrice] = useState(String(material?.unitPrice ?? ""));
  const [unit, setUnit] = useState(material?.unit || "kg");
  const [alertLevel, setAlertLevel] = useState(
    String(material?.alertLevel ?? "10")
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      unitPrice: Number(unitPrice) || 0,
      unit,
      alertLevel: Number(alertLevel) || 0,
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
            placeholder="e.g., Flour (All-purpose)"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="unitPrice">Unit price</FieldLabel>
          <Input
            id="unitPrice"
            type="number"
            inputMode="decimal"
            value={unitPrice}
            onChange={(e) => setunitPrice(e.target.value)}
            placeholder="e.g., 35"
            min="0"
            step="0.01"
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
              <SelectItem value="kg">kg</SelectItem>
              <SelectItem value="g">g</SelectItem>
              <SelectItem value="pack">pack</SelectItem>
              <SelectItem value="piece">piece</SelectItem>
              <SelectItem value="ltr">ltr</SelectItem>
              <SelectItem value="dozen">dozen</SelectItem>
              <SelectItem value="bottle">bottle</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="alertLevel">Alert Level</FieldLabel>
          <Input
            id="alertLevel"
            type="number"
            inputMode="decimal"
            value={alertLevel}
            onChange={(e) => setAlertLevel(e.target.value)}
            placeholder="e.g., 35"
            min="0"
            step="0.01"
            required
          />
        </Field>

        <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? "Save Changes" : "Add Material"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default MaterialForm;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/button";
import Input from "@/components/input";
import { Label } from "@/components/label";
import Select from "@/components/Select";
import FormError from "@/components/FormError";

import { categories, types } from "@/libs/constant";
import { transactionSchema } from "@/libs/validation";
import { createTransaction, updateTransaction } from "@/libs/actions";

type TransactionFormInput = z.input<typeof transactionSchema>;
type TransactionFormData = z.output<typeof transactionSchema>;

interface TransactionFormProps {
  initialData?: TransactionFormData & {
    id: string;
  };
}

export default function TransactionForm({ initialData }: TransactionFormProps) {
  const router = useRouter();

  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);

  const editing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormInput, unknown, TransactionFormData>({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData ?? {
      created_at: new Date().toISOString().split("T")[0],
    },
  });

  const type = watch("type");

  const onSubmit = async (data: TransactionFormData): Promise<void> => {
    setSaving(true);
    setLastError(null);

    try {
      if (editing && initialData) {
        await updateTransaction(initialData.id, data);
      } else {
        await createTransaction(data);
      }

      router.push("/dashboard");
    } catch (error) {
      setLastError(error instanceof Error ? error : new Error("Something went wrong"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label className="mb-1">Type</Label>

          <Select
            {...register("type", {
              onChange: (e) => {
                if (e.target.value !== "Expense") {
                  setValue("category", "");
                }
              },
            })}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>

          <FormError error={errors.type} />
        </div>

        <div>
          <Label className="mb-1">Category</Label>

          <Select {...register("category")} disabled={type !== "Expense"}>
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          <FormError error={errors.category} />
        </div>

        <div>
          <Label className="mb-1">Date</Label>

          <Input {...register("created_at")} disabled={editing} />

          <FormError error={errors.created_at} />
        </div>

        <div>
          <Label className="mb-1">Amount</Label>

          <Input
            type="number"
            {...register("amount", {
              valueAsNumber: true,
            })}
          />

          <FormError error={errors.amount} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label className="mb-1">Description</Label>

          <Input {...register("description")} />

          <FormError error={errors.description} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>{lastError && <FormError error={lastError} />}</div>

        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}

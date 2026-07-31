"use client";
import { deleteTransaction } from "@/libs/actions";
import { Button } from "./button";
import { X, Loader } from "lucide-react";
import { useState } from "react";

export const TransactionItemRemoveButton = ({ id, onRemoved }: { id: string; onRemoved: () => void }) => {
  const [loading, setLoading] = useState<boolean>();
  const [confirmed, setConfirmed] = useState<boolean>();
  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    try {
      setLoading(true);
      await deleteTransaction(id);
      onRemoved();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button size="xs" variant={!confirmed ? "ghost" : "danger"} onClick={handleClick} aria-disabled={loading}>
      {!loading && <X className="w-4 h-4" />}
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
  );
};

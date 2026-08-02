"use client";

import { useState } from "react";
import { Loader } from "lucide-react";

import { Button } from "@/components/button";
import { Separator } from "@/components/Separator";
import { TransactionItem } from "@/components/TransactionItem";
import { TransactionSummaryItem } from "@/components/TransactionSummaryItem";
import { fetchTransactions } from "@/libs/actions";
import { groupAndSumTransactionsByDate } from "@/libs/utils";

enum TransactionType {
  Income = "Income",
  Expense = "Expense",
  Saving = "Saving",
  Investment = "Investment",
}

 interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category?: string;
  description?: string;
  created_at: string;
}

interface TransactionListProps {
  range: string;
  initialTransactions: Transaction[];
}

export default function TransactionList({ range, initialTransactions }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const [buttonHidden, setButtonHidden] = useState(initialTransactions.length === 0);

  const [loading, setLoading] = useState(false);

  const grouped = groupAndSumTransactionsByDate(transactions);

  const handleClick = async (): Promise<void> => {
    setLoading(true);

    try {
      const nextTransactions = await fetchTransactions(range, transactions.length, 10);

      if (!nextTransactions) return;

      setButtonHidden(nextTransactions.length === 0);

      setTransactions((prevTransactions) => [...prevTransactions, ...nextTransactions]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoved = (id: string) => (): void => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
  };

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <TransactionSummaryItem date={date} amount={amount} />

          <Separator />

          <section className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <TransactionItem {...transaction} onRemoved={handleRemoved(transaction.id)} />
              </div>
            ))}
          </section>
        </div>
      ))}

      {transactions.length === 0 && <div className="text-center text-gray-400 dark:text-gray-500">No transactions found</div>}

      {!buttonHidden && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={handleClick} disabled={loading}>
            <div className="flex items-center space-x-1">
              {loading && <Loader className="animate-spin" />}
              <span>Load More</span>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}

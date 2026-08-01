enum TransactionType {
  Income = "Income",
  Expense = "Expense",
  Saving = "Saving",
  Investment = "Investment",
}

interface TransactionPropsType {
  id: string;
  type: TransactionType;
  category?: string;
  description?: string;
  amount: number;
  created_at: string;
  onRemoved?: () => void;
}

interface GroupedTransaction {
  transactions: TransactionPropsType[];
  amount: number;
}

type GroupedTransactions = Record<string, GroupedTransaction>;

export const groupAndSumTransactionsByDate = (transactions: TransactionPropsType[]): GroupedTransactions => {
  const grouped: GroupedTransactions = {};

  for (const transaction of transactions) {
    const date = transaction.created_at.split("T")[0];

    if (!grouped[date]) {
      grouped[date] = {
        transactions: [],
        amount: 0,
      };
    }

    grouped[date].transactions.push(transaction);

    const amount = transaction.type === TransactionType.Expense ? -transaction.amount : transaction.amount;

    grouped[date].amount += amount;
  }

  return grouped;
};

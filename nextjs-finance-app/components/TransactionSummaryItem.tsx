import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { ReactNode } from "react";

interface TransactionSummaryItemProps {
  date: ReactNode;
  amount: number;
}

export const TransactionSummaryItem = ({ date, amount }: TransactionSummaryItemProps) => {
  const formattedAmount = useFormatCurrency(amount);
  return (
    <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
      <div className="grow">{date}</div>

      <div className="min-w-17.5 text-right font-semibold">{formattedAmount}</div>
      <div className="min-w-25"></div>
    </div>
  );
};

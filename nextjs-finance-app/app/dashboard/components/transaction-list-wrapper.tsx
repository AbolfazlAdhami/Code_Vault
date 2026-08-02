import { fetchTransactions } from "@/libs/actions";
import TransactionList from "./transaction-list";

export default async function TransactionListWrapper({ range }: { range: string }) {
  const transactions = await fetchTransactions(range);
  return <TransactionList initialTransactions={transactions} key={range} range={range} />;
}

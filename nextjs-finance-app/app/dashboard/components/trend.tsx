import { Trend as BaseTrend } from "@/components/Trend";
import { createClient } from "@/libs/supabase/server";

export type TransactionType = "Income" | "Expense" | "Investment" | "Saving";

export interface TrendProps {
  type: TransactionType;
  range: string;
}

interface TrendData {
  current_amount: number;
  previous_amount: number;
}

export default async function Trend({ type, range }: TrendProps) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("calculate_total", {
    range_arg: range,
    type_arg: type,
  });

  if (error) {
    throw new Error("Could not fetch the trend data");
  }

  const amounts = data?.[0] as TrendData | undefined;

  if (!amounts) {
    return null;
  }

  return <BaseTrend type={type} amount={amounts.current_amount} prevAmount={amounts.previous_amount} />;
}

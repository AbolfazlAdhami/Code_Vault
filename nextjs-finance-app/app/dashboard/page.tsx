import { Suspense } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import Range from "./components/range";
import TransactionListWrapper from "./components/transaction-list-wrapper";

import { sizes, variants } from "@/libs/variants";
import { createClient } from "@/libs/supabase/server";

enum TransactionType {
  Income = "Income",
  Expense = "Expense",
  Saving = "Saving",
  Investment = "Investment",
}

export const types = [TransactionType.Income, TransactionType.Expense, TransactionType.Investment, TransactionType.Saving] as const;

interface PageProps {
  searchParams: Promise<{
    range?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const settings = user?.user_metadata;

  const range = params.range ?? settings?.defaultView ?? "last30days";

  return (
    <div className="space-y-8">
      <section className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold">Summary</h1>

        <aside>
          <Range defaultView={settings?.defaultView} />
        </aside>
      </section>

      <section className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {types.map((type: TransactionType) => (
          <ErrorBoundary key={type} fallback={<div className="text-red-500">Cannot fetch {type} trend data</div>}>
            <Suspense fallback={<TrendFallback />}>
              <Trend type={type} range={range} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </section>

      <section className="flex items-center justify-between">
        <h2 className="text-2xl">Transactions</h2>

        <Link href="/dashboard/transaction/add" className={`flex items-center space-x-1 ${variants.outline} ${sizes.sm}`}>
          <PlusCircle className="h-4 w-4" />
          <span>Add</span>
        </Link>
      </section>

      <Suspense fallback={<TransactionListFallback />}>
        <TransactionListWrapper range={range} />
      </Suspense>
    </div>
  );
}

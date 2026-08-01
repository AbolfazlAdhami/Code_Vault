import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const client = createClient();

  console.log((await client).from("transactions").select());

  return redirect("/dashboard");
}

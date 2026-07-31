import { createClient } from "@/libs/supabase/server";

export default async function Home() {
  const client = createClient();

  console.log((await client).from("transactions").select());

  return <div>Hello</div>;
}

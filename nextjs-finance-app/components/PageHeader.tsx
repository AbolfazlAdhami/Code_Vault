import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import useServerDarkMode from "@/hooks/use-server-dark-mode";
import { createClient } from "@/lib/supabase/server";
import { KeyRound } from "lucide-react";
import { sizes, variants } from "@/libs/variants";
// import SignOutButton from ".";
import Avatar from "./avatar";

export const PageHeader = async ({ className }: { className: string }) => {
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link href={"/"}></Link>
    </header>
  );
};

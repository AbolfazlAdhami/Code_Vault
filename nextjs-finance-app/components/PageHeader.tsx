import Link from "next/link";

export const PageHeader = async ({ className }: { className: string }) => {
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link href={"/"}></Link>
    </header>
  );
};

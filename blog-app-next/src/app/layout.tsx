import { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import useServerDarkMode from "@/hooks/use-server-dark-mode";
import Header from "@/components/header";
import { CookiesProviderHOC } from "@/components/CookiesProvider";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Blog Page",
    default: "Blog Page",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useServerDarkMode();
  return (
    <html lang="en">
      <body className={`min-h-full flex flex-col ${roboto.className} ${theme}`}>
        <CookiesProviderHOC>
          <Header />
          <main>{children}</main>
        </CookiesProviderHOC>
      </body>
    </html>
  );
}

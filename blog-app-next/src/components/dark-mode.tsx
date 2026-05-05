"use client";

import useDarkMode from "@/hooks/use-dark-mode";

const nextModeIcons = {
  light: "🌚" as "dark",
  dark: "🌝" as "light",
};

export default function DarkMode({ defaultTheme }: { defaultTheme: "dark" | "light" }) {
  const { theme, toggleTheme } = useDarkMode(defaultTheme);
  return <button onClick={toggleTheme}>{nextModeIcons[theme]}</button>;
}

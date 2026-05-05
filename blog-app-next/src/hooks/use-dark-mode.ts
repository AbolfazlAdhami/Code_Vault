import { useState } from "react";
import { useCookies } from "react-cookie";

const useDarkMode = (defaultTheme: "dark" | "light" = "dark") => {
  const [theme, setTheme] = useState<"dark" | "light">(defaultTheme);
  const [_, setCookie] = useCookies(["theme"]);

  const setAndSaveTheme = (theme: "light" | "dark") => {
    setTheme(theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    setCookie("theme", theme);
  };
  const toggleTheme = () => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
};

export default useDarkMode;

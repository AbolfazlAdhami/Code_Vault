import { cookies } from "next/headers";

const useServerDarkMode = async (defaultTheme = "dark") => {
  const themeCookies = await cookies();
  return themeCookies.get("theme")?.value ?? defaultTheme;
};

export default useServerDarkMode;

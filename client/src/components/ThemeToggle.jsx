import { Leaf, MoonStarIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const getTheme = () => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") return true;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDark, setIsDark] = useState(getTheme);

  useEffect(() => {
    if (isDark) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  return (
    <button className="p-2 transition-color duration-300 rounded-full focus:outline-none" onClick={toggleTheme}>
      {isDark ? (
        <MoonStarIcon size={20} className="text-primary" />
      ) : (
        <Leaf size={20} className="text-primary"/>
      )}
    </button>
  );
};

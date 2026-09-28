"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("portfolio-theme", next);
  }
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle color theme" title="Toggle color theme"><Sun className="theme-sun" size={18}/><Moon className="theme-moon" size={18}/></button>;
}

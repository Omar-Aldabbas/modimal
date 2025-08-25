import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavTags } from "../data/NavTags";
import { Logo } from "./Logo";
import { User2, Heart, Search, LucideShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const MobileNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const toggleMobileDropdown = (tag) => {
    setMobileDropdown(mobileDropdown === tag.title ? null : tag.title);
  };

  return (
    <nav className="md:hidden sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-background shadow-sm">
        <Logo className="cursor-pointer" />
        <div className="flex items-center gap-4">
          <Link>
            <LucideShoppingBag size={24} className="p-1 rounded hover:bg-primary/20 transition" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded hover:bg-primary/20 transition"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-start pt-24 px-6 space-y-6 transition-opacity duration-300">
          {/* Close button at top-right */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-2 rounded hover:bg-primary/20 transition"
          >
            <X size={28} />
          </button>

          {/* Theme Toggle */}
          <div className="w-full flex justify-center mb-6">
            <ThemeToggle />
          </div>

          {/* Icons */}
          <div className="flex gap-8 mb-6">
            <Link className="p-2 rounded hover:bg-primary/20 transition">
              <User2 size={24} />
            </Link>
            <Link className="p-2 rounded hover:bg-primary/20 transition">
              <Heart size={24} />
            </Link>
            <Link className="p-2 rounded hover:bg-primary/20 transition">
              <Search size={24} />
            </Link>
          </div>

          {/* NavTags Accordion */}
          <div className="w-full flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-6rem)] pb-6">
            {NavTags.map((tag, i) => (
              <div key={i} className="w-full">
                <button
                  onClick={() => toggleMobileDropdown(tag)}
                  className="w-full flex justify-between items-center py-3 px-5 bg-primary/5 rounded-lg font-semibold text-primary text-base transition-colors hover:bg-primary/10"
                >
                  {tag.title}
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${mobileDropdown === tag.title ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Smooth dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileDropdown === tag.title ? "max-h-[500px] mt-2" : "max-h-0"
                  }`}
                >
                  <ul className="flex flex-col gap-2 pl-6">
                    {Object.entries(tag.sections).map(([section, values], idx) => (
                      <li key={idx}>
                        <h4 className="font-medium text-sm text-primary mb-1">{section}</h4>
                        <ul className="flex flex-col gap-1">
                          {values.map((value, j) => (
                            <li key={j}>
                              <Link className="hover:text-primary/90 hover:underline transition">{value}</Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

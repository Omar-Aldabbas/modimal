import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavTags } from "../data/NavTags";
import { Logo } from "./Logo";
import { User2, Heart, Search, LucideShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { UserContext } from "../context/UserContext";

export const MobileNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const handleNavigate = (path) => {
    setMobileOpen(false); 
    navigate(path);
  };

  const toggleMobileDropdown = (tag) => {
    setMobileDropdown(mobileDropdown === tag.title ? null : tag.title);
  };

  return (
    <nav className="md:hidden sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-background shadow-sm">
        <Logo className="cursor-pointer" onClick={() => handleNavigate("/")} />
        <div className="flex items-center gap-3">
          <button onClick={() => handleNavigate("/cart")} className="p-2 rounded hover:bg-primary/10 transition">
            <LucideShoppingBag size={24} />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded hover:bg-primary/10 transition"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-2 rounded hover:bg-primary/10 transition"
          >
            <X size={28} />
          </button>

          {/* Top actions */}
          <div className="flex justify-center items-center mt-20 gap-6 px-4">
            <ThemeToggle />
            <button onClick={() => handleNavigate(user ? "/account" : "/login")} className="p-2 rounded hover:bg-primary/10 transition">
              <User2 size={24} />
            </button>
            <button onClick={() => handleNavigate(user ? "/wishlist" : "/login")} className="p-2 rounded hover:bg-primary/10 transition">
              <Heart size={24} />
            </button>
            <button onClick={() => handleNavigate("/products")} className="p-2 rounded hover:bg-primary/10 transition">
              <Search size={24} />
            </button>
          </div>

          {/* NavTags Accordion */}
          <div className="flex-1 overflow-y-auto mt-6 px-4 pb-8">
            {NavTags.map((tag, i) => (
              <div key={i} className="w-full mb-2">
                <button
                  onClick={() => toggleMobileDropdown(tag)}
                  className="w-full flex justify-between items-center py-3 px-4 rounded-md font-semibold text-primary text-base transition hover:bg-primary/5"
                >
                  {tag.title}
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${mobileDropdown === tag.title ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileDropdown === tag.title ? "max-h-[1000px] mt-2" : "max-h-0"
                  }`}
                >
                  <ul className="flex flex-col gap-2 pl-4">
                    {Object.entries(tag.sections).map(([section, values], idx) => (
                      <li key={idx}>
                        <h4 className="font-medium text-sm text-primary mb-1">{section}</h4>
                        <ul className="flex flex-col gap-1">
                          {values.map((value, j) => (
                            <li key={j}>
                              <button
                                onClick={() => handleNavigate(`/products?tag=${value}`)}
                                className="text-left hover:text-primary/90 hover:underline transition text-sm w-full"
                              >
                                {value}
                              </button>
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

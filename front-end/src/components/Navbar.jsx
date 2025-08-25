import { useEffect, useState } from "react";
import { NavTags } from "../data/NavTags";
import { Logo } from "./Logo";
import { cn } from "../utils/cn";
import { Link } from "react-router-dom";
import { Heart, LucideShoppingBag, Search, User2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileMenu = () => setIsOpen(!isOpen);

  const handleActiveTag = (tag) =>
    setActiveTag(activeTag?.title === tag.title ? null : tag);

  return (
    <nav
      className={cn(
        "relative w-full transition-all duration-300",
        isScroll
          ? "bg-background/80 backdrop-blur-xs fixed  "
          : "bg-background"
      )}
    >
      <div className="flex px-4 py-3 items-center justify-around">
        <Logo />
        <ul className="flex gap-10 text-body">
          {NavTags.map((tag, i) => (
            <li key={i} className="font-thin hover:text-header">
              <button onClick={() => handleActiveTag(tag)}>{tag.title}</button>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 justify-center items-center">
          <Link>
            <Search size={20} className="hover:text-header" />
          </Link>
          <Link>
            <Heart size={20} className="hover:text-header" />
          </Link>
          <Link>
            <User2 size={20} className="hover:text-header" />
          </Link>
          <Link>
            <LucideShoppingBag size={20} className="hover:text-header" />
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {activeTag && (
        <div
          className={cn(
            "grid grid-cols-2 justify-center items-center px-8 w-full h-[60vh]",
            isScroll ? "bg-background/80 fixed backdrop-blur-md" : "bg-background"
          )}
        >
          <div className="grid grid-cols-3  p-1 gap-3 px-4">
            {Object.entries(activeTag.sections).map(([title, items]) => (
              <div key={title}>
                <h4 className="mb-3 text-header">{title}</h4>
                <ul className="text-body">
                  {items.map((tag, i) => (
                    <li key={i} className="mb-2">
                      <a href="#" className="hover:text-header hover:underline">
                        {tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

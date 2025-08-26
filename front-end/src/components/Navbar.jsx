import { cn } from "../utils/cn";
import { NavTags } from "../data/NavTags";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import {
  Heart,
  LucideShoppingBag,
  Search,
  User2,
  Menu,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import formality from "../assets/images/formality.png";
import newWinter from "../assets/images/newWinter.png";
import {MobileNavbar} from "./MobileNavbar" 

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTag, setActiveTag] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getActiveTag = (tag) => {
    setActiveTag(activeTag?.title === tag.title ? null : tag);
  };

  const handleLogo = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
    <nav
      className={cn(
        "hidden md:flex sticky top-0 z-50 py-3  flex-col w-full transition-all duration-500",
        isScrolled ? "bg-background/80 backdrop-blur-xs" : "bg-background"
      )}
    >
      <ul className="flex justify-around items-center px-4">
        <li>
          <Logo
            onClick={handleLogo}
            className="cursor-pointer hover:text-header"
          />
        </li>
        <li>
          <ul className="font-thin text-md text-body/90 flex justify-between items-center gap-5">
            {NavTags.map((tag, i) => (
              <li key={i} className="">
                <button
                  onClick={() => getActiveTag(tag)}
                  className="hover:text-header transition-colors"
                >
                  {tag.title}
                </button>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <ul className="hidden md:flex gap-3 justify-center items-center">
            <li>
              <Link>
                <Search size={24} className="hover:text-header" />
              </Link>
            </li>
            <li>
              <Link>
                <Heart size={24} className="hover:text-header" />
              </Link>
            </li>
            <li>
              <Link>
                <User2 size={24} className="hover:text-header" />
              </Link>
            </li>
            <li>
              <Link>
                <LucideShoppingBag size={24} className="hover:text-header" />
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </li>
      </ul>

      {activeTag && (
        <div className="sticky top-0 min-h-[60vh] py-4 flex justify-around items-center w-full">
          <div className="grid grid-cols-3 gap-6 px-6 ">
            {Object.entries(activeTag.sections).map(([title, values]) => (
              <div key={title}>
                <h4 className="text-md mb-3 text-primary">{title}</h4>
                <ul className="text-foreground space-y-2">
                  {values.map((value, i) => (
                    <li
                      key={i}
                      className="hover:text-primary/90 hover:underline text-sm transition-all duration-500"
                    >
                      <Link>{value}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-8 p-3">
            <Link>
            <div className="flex flex-col gap-2 p-1 hover:text-primary/90 hover:underline text-md transition-all duration-500">
              <img
                src={formality}
                alt="Our unique formal collection"
                className="w-[240px] h-[300px] space-y-3 rounded-lg"
              />
              <h4 >
                Formality Collection
              </h4>
            </div>
            </Link>
            <Link>
            <div className="flex flex-col gap-2 p-1 hover:text-primary/90 hover:underline text-md transition-all duration-500">
              <img
                src={newWinter}
                alt="For warm winters"
                className="w-[240px] h-[300px] space-y-3 rounded-lg"
              />
              <h4 >
                newWinter Collection
              </h4>
            </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
    <MobileNavbar/>
    </>
  );
};

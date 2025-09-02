import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { NavTags } from "../data/NavTags";
import { UserContext } from "../context/UserContext";
import { StoreContext } from "../context/StoreContext";
import { Heart, LucideShoppingBag, Search, User2 } from "lucide-react";
import { MobileNavbar } from "./MobileNavbar";
import { ThemeToggle } from "./ThemeToggle";
import formality from "../assets/images/formality.png";
import newWinter from "../assets/images/newWinter.png";
import { cn } from "../utils/cn";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { cart, wishlist } = useContext(StoreContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const dropdownRef = useRef(null);

  const formatTag = (label) =>
    label.toLowerCase().replace(/\s*&\s*/g, ",").replace(/\s+/g, "-");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    setWishlistCount(wishlist.length);
  }, [cart, wishlist]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveTag(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTag = (tag) => {
    setActiveTag(activeTag?.title === tag.title ? null : tag);
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateAuth = (pathIfLoggedOut, pathIfLoggedIn) => {
    if (user) {
      navigate(pathIfLoggedIn);
    } else {
      navigate(pathIfLoggedOut);
    }
  };

  return (
    <>
      <nav
        className={cn(
          "hidden md:flex sticky top-0 z-50 py-3 flex-col w-full transition-all duration-500",
          isScrolled ? "bg-background/80 backdrop-blur-xs" : "bg-background"
        )}
      >
        <ul className="flex justify-around items-center px-4">
          <li>
            <Logo
              onClick={handleLogoClick}
              className="cursor-pointer hover:text-header"
            />
          </li>

          <li>
            <ul className="font-thin text-md text-body/90 flex gap-5">
              {NavTags.map((tag, i) => (
                <li key={i}>
                  <button
                    onClick={() => toggleTag(tag)}
                    className="hover:text-header transition-colors"
                  >
                    {tag.title}
                  </button>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <ul className="hidden md:flex gap-3 items-center relative">
              <li>
                <button onClick={() => navigate("/products")}>
                  <Search size={20} className="hover:text-header" />
                </button>
              </li>

              <li className="relative">
                <button onClick={() => navigateAuth("/login", "/wishlist")}>
                  <Heart size={20} className="hover:text-header" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </li>

              <li>
                <button onClick={() => navigateAuth("/login", "/account")}>
                  <User2 size={20} className="hover:text-header" />
                </button>
              </li>

              <li className="relative">
                <button onClick={() => navigate("/cart")}>
                  <LucideShoppingBag size={20} className="hover:text-header" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>
              </li>

              <li>
                <ThemeToggle />
              </li>
            </ul>
          </li>
        </ul>

        {activeTag && (
          <div
            ref={dropdownRef}
            className="sticky top-0 min-h-[60vh] py-4 flex justify-around items-center w-full"
          >
            <div className="grid grid-cols-3 gap-6 px-6">
              {Object.entries(activeTag.sections).map(([title, values]) => (
                <div key={title}>
                  <h4 className="text-md mb-3 text-primary">{title}</h4>
                  <ul className="text-foreground space-y-2">
                    {values.map((value, i) => (
                      <li
                        key={i}
                        className="hover:text-primary/90 hover:underline text-sm transition-all duration-500"
                      >
                        <Link
                          to={`/products?tags=${formatTag(value)}`}
                          onClick={() => setActiveTag(null)}
                        >
                          {value}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-8 p-3">
              <Link
                to="/products?tags=formal"
                onClick={() => setActiveTag(null)}
              >
                <div className="flex flex-col gap-2 p-1 hover:text-primary/90 hover:underline text-md transition-all duration-500">
                  <img
                    src={formality}
                    alt="Formality Collection"
                    className="w-[200px] h-[300px] object-cover"
                  />
                  <h4>Formality Collection</h4>
                </div>
              </Link>

              <Link
                to="/products?season=winter"
                onClick={() => setActiveTag(null)}
              >
                <div className="flex flex-col gap-2 p-1 hover:text-primary/90 hover:underline text-md transition-all duration-500">
                  <img
                    src={newWinter}
                    alt="New Winter Collection"
                    className="w-[200px] h-[300px] object-cover"
                  />
                  <h4>New Winter Collection</h4>
                </div>
              </Link>
            </div>
          </div>
        )}
      </nav>

      <MobileNavbar />
    </>
  );
};

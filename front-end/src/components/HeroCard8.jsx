import { Link } from "react-router-dom";
import Jotraditional from "../assets/Cards/Jotraditional.png";

export const HeroCard8 = () => {
  return (
    <div
      className="w-full min-h-[90vh] bg-cover bg-center lg:bg-top relative flex flex-col justify-center px-6 md:px-16"
      style={{ backgroundImage: `url(${Jotraditional})` }}
    >
      <div
        className="
          relative
          space-y-6
          text-center
          md:absolute md:bottom-20 md:right-16 md:text-right
          max-w-lg
        "
      >
        <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-2xl cursor-default">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-white to-gold-500 italic">
            Experience
          </span>{" "}
          <span className="text-gold-400 font-extrabold text-4xl md:text-6xl transform -rotate-2 drop-shadow-lg">
            Jotraditional
          </span>{" "}
          — embrace the{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gold-300 font-semibold italic">
            timeless Arabic elegance
          </span>
          .
        </h2>

        <Link
          to={{
            pathname: "/products",
            search: "?search=traditional",
          }}
          // to="/products?category=traditional"
          className="relative inline-block group px-6 py-3 bg-gold-600 text-white font-bold text-lg shadow-lg overflow-hidden border-2 border-gold-500 hover:bg-gold-700 transition"
        >
          <span className="absolute inset-0 bg-yellow-400 opacity-20 scale-0 group-hover:scale-125 transform origin-center transition-transform duration-500"></span>
          <span className="relative z-10">Explore Traditional Dresses</span>
        </Link>
      </div>
    </div>
  );
};

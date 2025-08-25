import { Link } from "react-router-dom";
import SpringCollection from "../assets/Cards/springCollection.png";

export const HeroCard6 = () => {
  return (
    <div
      className="w-full min-h-[90vh] bg-cover bg-center lg:bg-top relative flex flex-col justify-center px-6 md:px-16"
      style={{ backgroundImage: `url(${SpringCollection})` }}
    >
      <div
        className="
          relative
          space-y-6
          text-left
          md:absolute md:bottom-16 md:left-12
          max-w-lg
        "
      >
        <h2 className="text-3xl md:text-5xl text-pink-300 italic font-bold drop-shadow-xl cursor-default">
          Bloom into <span className="text-pink-500">Spring Radiance</span> —
          feel the energy of{" "}
          <span className="text-pink-400">fresh elegance</span>.
        </h2>

        <Link
          to="/products?season=spring"
          className="relative inline-block group px-6 py-3 bg-pink-600 text-white font-semibold text-lg shadow-lg overflow-hidden border-2 border-pink-500 hover:bg-pink-700 transition"
        >
          <span className="absolute inset-0 bg-pink-400 opacity-30 scale-0 group-hover:scale-150 transition-transform duration-500"></span>
          <span className="relative z-10">Discover Dresses</span>
        </Link>
      </div>
    </div>
  );
};

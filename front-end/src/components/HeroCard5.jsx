import { Link } from "react-router-dom";
import HaveAGreatJeans from "../assets/Cards/haveAGreatJeans.png";

export const HeroCard5 = () => {
  return (
    <div
      className="w-full min-h-[90vh] bg-cover  bg-center lg:bg-top relative flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${HaveAGreatJeans})` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>

      <div className="relative z-10 max-w-lg text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-extrabold italic text-blue-100 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
          <span className="text-blue-400">Have a Great Jeans</span> — 
          casual comfort meets effortless <span className="text-blue-200">style</span>.
        </h2>

        <Link
          to="/products?tag=tshirt,casual"
          className="relative inline-block px-6 py-3 font-bold text-lg text-white border-2 border-blue-400 overflow-hidden group hover:text-black"
        >
          {/* Button hover effect */}
          <span className="absolute -top-1 -left-1 w-full h-full bg-blue-400 rotate-[-4deg] scale-110 origin-top-left transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"></span>
          <span className="relative z-10">T-shirts & Casual</span>
        </Link>
      </div>
    </div>
  );
};


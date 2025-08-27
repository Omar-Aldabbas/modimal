import { Link } from "react-router-dom";
import PunkCollection from "../assets/Cards/punkCollection.png";

export const HeroCard4 = () => {
  return (
    <div
      className="w-full min-h-[90vh] bg-cover bg-center lg:bg-top relative flex items-center px-4"
      style={{ backgroundImage: `url(${PunkCollection})` }}
    >
      {/* Bloody overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>

      <div className="relative z-10 max-w-lg md:absolute md:top-1/2 md:left-8 transform md:-translate-y-1/2 text-left space-y-6">
        <h2 className="text-3xl md:text-5xl font-extrabold italic text-red-600 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
          Enter the <span className="text-red-800">Bloody Streets</span> —
          chaos, rebellion, and raw <span className="text-red-500">style</span>.
        </h2>

        <Link
          to={{
            pathname: "/products",
            search: "?search=casual",
          }}
          className="relative inline-block px-6 py-3 font-bold text-lg text-white border-2 border-red-800 overflow-hidden group hover:text-black"
        >
          {/* Bloody jagged hover background */}
          <span className="absolute -top-1 -left-1 w-full h-full bg-red-800 rotate-[-6deg] scale-125 origin-top-left transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"></span>
          <span className="relative z-10">Explore Punk</span>
        </Link>
      </div>
    </div>
  );
};

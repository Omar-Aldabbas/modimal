import { Link } from "react-router-dom";
import winterCollection from "../assets/Cards/winterCollection.png";

export const HeroCard7 = () => {
  return (
    <div
      className="w-full min-h-[90vh] bg-cover bg-center lg:bg-top relative flex flex-col justify-center px-6 md:px-16"
      style={{ backgroundImage: `url(${winterCollection})` }}
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
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-iceBlue-300 via-white to-iceBlue-500 italic">
            Step into
          </span>{" "}
          <span className="text-iceBlue-400 font-extrabold text-4xl md:text-6xl transform -rotate-2 drop-shadow-lg">
            Winter Elegance
          </span>{" "}
          — embrace the{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-iceBlue-300 font-semibold italic">
            chill sophistication
          </span>
          .
        </h2>

        <Link
          to={{
            pathname: "/products",
            search: "?seasin=winter",
          }}
          className="relative inline-block group px-6 py-3 bg-iceBlue-600 text-white font-bold text-lg shadow-lg overflow-hidden border-2 border-iceBlue-500 hover:bg-iceBlue-700 transition"
        >
          <span className="absolute inset-0 bg-blue-400 opacity-20 scale-0 group-hover:scale-125 transform origin-center transition-transform duration-500"></span>
          <span className="relative z-10">Explore Winter Styles</span>
        </Link>
      </div>
    </div>
  );
};

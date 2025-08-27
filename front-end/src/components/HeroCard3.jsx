import { Link } from "react-router-dom";
import NewWinterCollection from "../assets/Cards/newWinterCollection.png";

export const HeroCard3 = () => {
  return (
    <div
      className="w-full min-h-[90vh] bg-cover bg-center lg:bg-top relative flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${NewWinterCollection})` }}
    >
      {/* Overlay to improve readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/40"></div>

      <div
        className="
          relative space-y-6
          text-center
          md:text-left
          md:absolute md:bottom-12 md:left-12
          max-w-lg z-10
        "
      >
        <h2 className="text-3xl md:text-5xl text-white italic font-bold drop-shadow-lg">
          Step into the <span className="text-sky-400">Autumn Chill</span> —
          where crisp air meets{" "}
          <span className="text-sky-300">icy elegance</span>.
        </h2>

        {/* Unique button */}
        <Link
          to={{
            pathname: "/products",
            search: "?season=Autumn",
          }}
          className="inline-block relative px-6 py-3 font-medium text-lg text-white border-2 border-sky-400 overflow-hidden group"
        >
          <span className="absolute inset-0 bg-sky-400 group-hover:translate-x-0 group-hover:translate-y-0 transform -translate-x-full -translate-y-full transition-transform duration-300"></span>
          <span className="relative z-10 group-hover:text-black">
            Ice Autumn
          </span>
        </Link>
      </div>
    </div>
  );
};

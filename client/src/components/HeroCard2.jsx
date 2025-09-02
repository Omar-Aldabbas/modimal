import { Link } from "react-router-dom";
import OldNightCollection from "../assets/Cards/oldNightCollection.png";

export const HeroCard2 = () => {
  return (
    <div
      className="w-full min-h-[90vh] bg-cover bg-center lg:bg-top relative flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${OldNightCollection})` }}
    >
      <div
        className="
          relative space-y-6
          text-center
          md:text-right
          md:absolute md:bottom-15 md:right-30
          max-w-lg
        "
      >
        <h2 className="text-3xl md:text-5xl text-purple-300 italic font-bold drop-shadow-xl cursor-default">
          Embrace the <span className="text-purple-500">Shadow Veil</span> —
          where timeless mystery meets modern{" "}
          <span className="text-purple-400">style</span>.
        </h2>

        <Link
          to={{
            pathname: "/products",
            search: "?search=dress",
          }}
          className="inline-block bg-purple-600 text-white px-6 py-3 font-medium text-lg shadow-md hover:bg-purple-700 transition border border-3 border-background"
        >
          Explore Dresses
        </Link>
      </div>
    </div>
  );
};

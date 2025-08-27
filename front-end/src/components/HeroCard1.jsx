import { Link } from "react-router-dom";
import Hero from "../assets/images/Hero.png";

export const HeroCard1 = () => {
  return (
    <div
      className="w-full min-h-[90vh] bg-cover bg-center lg:bg-top relative flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${Hero})` }}
    >
      <div className="relative space-y-6 md:-left-[300px]">
        <h2 className="text-3xl md:text-5xl text-white/90 italic font-semibold max-w-lg cursor-default">
          <span className="text-primary">Elegance</span> in simplicity, Earth’s
          harmony
        </h2>

        {/* Button to products page with tag=formal */}
        <Link
          to={{
            pathname: "/products",
            search: "?search=formal",
          }}
          className="inline-block bg-primary text-white px-6 py-3 font-medium text-lg shadow-md hover:bg-primary/80 transition"
        >
          Discover Formality
        </Link>
      </div>
    </div>
  );
};

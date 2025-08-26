import { Link } from "react-router-dom";
import Sustainability from "../assets/images/Sustainability.png";

export const SustainabilitySection = () => {
  return (
    <section
      style={{ backgroundImage: `url(${Sustainability})` }}
      className="w-full min-h-[40vh] bg-no-repeat bg-cover bg-center  bg-fixed flex items-center justify-center relative py-5 mt-5"
    >
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-6">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Stylish sustainability in clothing promotes eco-friendly choices for a
          greater future
        </h2>
        <Link
          to="/sustainability"
          className="inline-block bg-pink-100 text-black/70 px-6 py-3 font-semibold shadow-lg hover:bg-primary/90 transition tracking-widest"
        >
          Sustainability
        </Link>
      </div>
    </section>
  );
};

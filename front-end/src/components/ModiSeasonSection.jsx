import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SummerImg from "../assets/images/ModiSummer.png";
import SpringImg from "../assets/images/ModiSpring.png";
import AutumnImg from "../assets/images/ModiAutumn.png";
import WinterImg from "../assets/images/ModiWinter.png";

const seasons = [
  { name: "ModiSummer", img: SummerImg, season: "summer" },
  { name: "ModiSpring", img: SpringImg, season: "spring" },
  { name: "ModiAutumn", img: AutumnImg, season: "autumn" },
  { name: "ModiWinter", img: WinterImg, season: "winter" },
];

export const ModiSeasonSection = () => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef();

  const nextSlide = () => setCurrent((prev) => (prev + 1) % seasons.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? seasons.length - 1 : prev - 1));

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => autoPlayRef.current && autoPlayRef.current();
    const interval = setInterval(play, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => (touchStartX.current = e.changedTouches[0].screenX);
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  return (
    <section className="max-w-7xl mx-auto py-6 px-6  mt-10 md:mt-20">
      <h2 className="text-3xl md:text-5xl text-bold cursor-default text-foreground mb-6">
        modiSeason
      </h2>

      <div className="hidden md:grid grid-cols-4 gap-4">
        {seasons.map((season) => (
          <Link
            key={season.season}
            to={`/products?season=${season.season}`}
            className="block w-full transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary lg:px-7 py-2 border border-foreground"
          >
            <img
              src={season.img}
              alt={season.name}
              className="w-full h-64 object-cover"
            />
            <h3 className="text-lg md:text-2xl lg:text-3xl text-foreground mt-2">
              {season.name}
            </h3>
          </Link>
        ))}
      </div>

      <div
        className="md:hidden relative overflow-hidden space-y-3"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {seasons.map((season) => (
            <Link
              key={season.season}
              to={`/products?season=${season.season}`}
              className="w-full flex-shrink-0 transform transition duration-300 hover:scale-105 p-4"
            >
              <img
                src={season.img}
                alt={season.name}
                className="w-full h-auto object-cover  "
              />
              <h3 className="text-lg md:text-2xl lg:text-3xl text-foreground mt-2 text-center md:text-left">
                {season.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="bottom-2 left-0 right-0 flex justify-center space-x-2">
          {seasons.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2  rounded-full transition-all duration-300 ${
                current === index ? "bg-primary" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

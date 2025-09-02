import { useState, useEffect, useRef } from "react";
import { HeroCard1 } from "./HeroCard1";
import { HeroCard2 } from "./HeroCard2";
import { HeroCard3 } from "./HeroCard3";
import { HeroCard4 } from "./HeroCard4";
import { HeroCard5 } from "./HeroCard5";
import { HeroCard6 } from "./HeroCard6";
import { HeroCard7 } from "./HeroCard7";
import { HeroCard8 } from "./HeroCard8";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
  <HeroCard1 key={0} />,
  <HeroCard2 key={1} />,
  <HeroCard3 key={2} />,
  <HeroCard4 key={3} />,
  <HeroCard5 key={4} />,
  <HeroCard6 key={5} />,
  <HeroCard7 key={6} />,
  <HeroCard8 key={7} />,
];

export const HeroGallery = () => {
  const [current, setCurrent] = useState(0);
  const length = cards.length;
  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };
    const interval = setInterval(play, 7000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  return (
    <section
      className="w-full relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {cards.map((card, index) => (
          <div className="w-full flex-shrink-0 h-screen" key={index}>
            {card}
          </div>
        ))}
      </div>

      <div className="hidden md:flex absolute top-1/2 transform -translate-y-1/2 w-full justify-between ">
        <button
          onClick={prevSlide}
          className="p-3 bg-opacity-50 text-black rounded-full hover:bg-black/70 transition"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 bg-opacity-50 text-black rounded-full hover:bg-black/70 transition"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      <div className="absolute bottom-30 md:bottom-40 lg:bottom-20 w-full flex justify-center space-x-3 ">
        {cards.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-lg cursor-pointer transition-all ${
              current === idx ? "bg-primary scale-105" : "bg-white/50"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
};

import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export const FollowSection = () => {
  const { products } = useContext(StoreContext);

  const getRandomProducts = (arr, num) => {
    if (!arr || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(num, arr.length));
  };

  const randomProducts = getRandomProducts(products, 5);

  // If there are no products, just render nothing
  if (randomProducts.length === 0) return null;

  return (
    <section className="w-full py-10 mt-5">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 px-6">
        <h2 className="text-3xl md:text-5xl font-bold cursor-default">
          Follow us @modimal
        </h2>

        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <img
              src={randomProducts[0].mainPic}
              alt={randomProducts[0].name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right 2x2 grid */}
          <div className="flex-1 grid grid-cols-2">
            {randomProducts.slice(1).map((prod) => (
              <img
                key={prod.id}
                src={prod.mainPic}
                alt={prod.name}
                className="w-full h-full object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

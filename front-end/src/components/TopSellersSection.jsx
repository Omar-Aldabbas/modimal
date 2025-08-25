import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";

export const TopSellersSection = () => {
  const { bestSelling, addToCart } = useContext(StoreContext);

  if (!bestSelling || bestSelling.length === 0) return null;

  // Take only the top 3
  const topThree = bestSelling.slice(0, 3);

  return (
    <section className="py-12 px-4 bg-background">
      <h2 className="text-3xl font-bold text-center mb-8">Top Sellers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topThree.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <Link to={`/products/${product.id}`}>
              <img
                src={product.mainPic}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
            </Link>
            <div className="p-4 flex flex-col flex-1 justify-between">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-4">
                {product.description.slice(0, 60)}...
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">${product.price}</span>
                <button
                  onClick={() =>
                    addToCart({
                      product,
                      variant: product.variants[0], // default first variant
                      quantity: 1,
                    })
                  }
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

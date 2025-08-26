import { Link } from "react-router-dom";
import NewTownCollection from "../assets/images/NewTownCollection.png";
import RebelCollection from "../assets/images/RebelCollection.png";
import FormalityCollection from "../assets/images/FormalityCollection.png";
import EssentialsCollection from "../assets/images/EssentialsCollection.png";

const collections = [
  { name: "Formality", img: FormalityCollection, tags: "elegant||formal" },
  { name: "newTown", img: NewTownCollection, tags: "creative||denim||tailored" },
  { name: "NOIR REBEL", img: RebelCollection, tags: "shiny||active||bold" },
  { name: "Essentials", img: EssentialsCollection, tags: "casual||smooth||soft||light" },
];

export const CollectionsSection = () => {
  return (
    <section className="max-w-7xl mx-auto flex flex-col px-6">
      <div className="md:mb-2">
        <h2 className="text-3xl md:text-5xl text-bold cursor-default text-foreground">
          Collections
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-10 py-4">
        {/* Left Column */}
        <div className="grid grid-rows-6 gap-3 md:gap-4">
          <div className="row-span-2">
            <Link
              to={`/products?tags=${collections[0].tags}`}
              className="block w-full h-full transform transition duration-300 hover:scale-102 hover:shadow-lg hover:shadow-primary "
            >
              <img
                src={collections[0].img}
                alt={`${collections[0].name} collection`}
                className="w-full h-full object-cover"
              />
              <h3 className="text-lg md:text-2xl lg:text-4xl text-foreground mt-2">
                {collections[0].name}
              </h3>
            </Link>
          </div>
          <div className="row-span-1" />
          <div className="row-span-3">
            <Link
              to={`/products?tags=${collections[1].tags}`}
              className="block w-full h-full transform transition duration-300 hover:scale-102 hover:shadow-lg hover:shadow-primary"
            >
              <img
                src={collections[1].img}
                alt={`${collections[1].name} collection`}
                className="w-full h-full object-cover"
              />
              <h3 className="text-lg md:text-2xl lg:text-4xl text-foreground mt-2">
                {collections[1].name}
              </h3>
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid grid-rows-6 gap-3 md:gap-4">
          <div className="row-span-3">
            <Link
              to={`/products?tags=${collections[2].tags}`}
              className="block w-full h-full transform transition duration-300 hover:scale-102 hover:shadow-lg hover:shadow-primary"
            >
              <img
                src={collections[2].img}
                alt={`${collections[2].name} collection`}
                className="w-full h-full object-cover"
              />
              <h3 className="text-lg md:text-2xl lg:text-4xl text-foreground mt-2">
                {collections[2].name}
              </h3>
            </Link>
          </div>
          <div className="row-span-1" />
          <div className="row-span-2 relative -top-1/3">
            <Link
              to={`/products?tags=${collections[3].tags}`}
              className="block w-full h-full transform transition duration-300 hover:scale-102 hover:shadow-lg hover:shadow-primary"
            >
              <img
                src={collections[3].img}
                alt={`${collections[3].name} collection`}
                className="w-full h-full object-cover"
              />
              <h3 className="text-lg md:text-2xl lg:text-4xl text-foreground mt-2">
                {collections[3].name}
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

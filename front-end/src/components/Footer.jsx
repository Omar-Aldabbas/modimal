import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand Section */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-2xl font-bold text-foreground">ModiBrand</h3>
          <p className="text-gray-600 text-sm">
            Elevating fashion with style, sustainability, and elegance.
          </p>
          <div className="flex space-x-4 mt-2">
            <Link to="#" className="hover:text-primary transition-colors">
              <Instagram size={22} />
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              <Facebook size={22} />
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              <Twitter size={22} />
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold text-lg mb-2 text-foreground">Quick Links</h4>
          <a href="#" className="hover:text-primary transition text-gray-600">
            Home
          </a>
          <Link to="/products" className="hover:text-primary transition text-gray-600">
            Shop
          </Link>
          <Link to="/sustainability" className="hover:text-primary transition text-gray-600">
            Sustainability
          </Link>
          <Link to="/contact" className="hover:text-primary transition text-gray-600">
            Contact
          </Link>
        </div>

        {/* Social / Info Section */}
        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold text-lg mb-2 text-foreground">Connect with Us</h4>
          <p className="text-gray-600 text-sm">
            Follow us on social media for the latest updates, style tips, and exclusive releases.
          </p>
          <div className="flex space-x-3 mt-3">
            {/* subtle rounded bg icons */}
            <Link to="#" className="bg-gray-700 dark:bg-gray-600 hover:bg-primary transition-colors p-2 rounded-full">
              <Instagram size={20} className="text-white" />
            </Link>
            <Link to="#" className="bg-gray-700 dark:bg-gray-600 hover:bg-primary transition-colors p-2 rounded-full">
              <Facebook size={20} className="text-white" />
            </Link>
            <Link to="#" className="bg-gray-700 dark:bg-gray-600 hover:bg-primary transition-colors p-2 rounded-full">
              <Twitter size={20} className="text-white" />
            </Link>
          </div>
        </div>

      </div>

      {/* Divider and Copyright */}
      <div className="mt-10 border-t border-gray-600 pt-5 text-sm text-gray-600 text-center">
        &copy; {new Date().getFullYear()} ModiBrand. All rights reserved.
      </div>
    </footer>
  );
};

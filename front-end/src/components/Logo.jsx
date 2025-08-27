import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Logo = ({ className = '', onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // First, trigger any custom onClick passed as a prop
    if (onClick) onClick();
    // Then navigate to home
    navigate("/");
  };

  return (
    <div onClick={handleClick} className={`flex flex-col items-center ${className}`}>
      <h2 className="text-3xl text-logo font-bold flex items-center tracking-widest font-logo">
        modimal
        <span>
          <Leaf
            size={10}
            className="text-white bg-primary rounded-full relative top-2"
          />
        </span>
      </h2>
      <p className="tracking-wider text-xs font-logo relative -top-1">women clothing</p>
    </div>
  );
};

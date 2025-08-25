import { Leaf } from "lucide-react";

export const Logo = ({className ='', onClick}) => {
  return (
    <div onClick={onClick} className={`flex flex-col items-center ${className} `}>
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

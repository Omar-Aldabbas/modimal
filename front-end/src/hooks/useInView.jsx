import { useEffect, useMemo, useRef, useState } from "react";

export const useInView = ({ options, once = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const memOptions = useMemo(() => options, [options]);
  const elRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      if(once && entry.isIntersecting) observer.unobserve(elRef.current);
    }, memOptions);


    observer.observe(elRef.current)

    return () => observer.disconnect();
  }, [memOptions, once]);

  return [isVisible, elRef];
};

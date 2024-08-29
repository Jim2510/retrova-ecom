import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Bnr() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const items = [
    {
      href: "/categories/bracelets",
      label: "BRACELETS",
      bgClass: "bg-bracelets",
    },
    {
      href: "/categories/necklaces",
      label: "NECKLACES",
      bgClass: "bg-necklaces",
    },
    { href: "/categories/earrings", label: "EARRINGS", bgClass: "bg-earrings" },
    { href: "/categories/rings", label: "RINGS", bgClass: "bg-rings" },
  ];

  return (
    <div className="w-full h-[450px] bg-white border-b-0 border-t-2 sm:border-y-2 border-black sm:grid-cols-4 text-xl sm:text-4xl grid grid-cols-2 justify-center items-center">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={`sm:order-${
            index + 1
          } hover:border-x-0 border-l-2 border-b-2 sm:border-b-0 border-r-0 sm:border-l-0 sm:border-r-2 border-black bg-cover col-span-1 h-full text-black font-extrabold flex justify-center items-center ${
            item.bgClass
          }`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          initial={{ filter: "blur(0px)" }}
          animate={{
            filter:
              hoveredIndex === null || hoveredIndex === index
                ? "blur(0px)"
                : "blur(5px)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href={item.href}
            className="w-full h-full flex items-end pb-14 justify-center sm:drop-shadow-[0_3px_3px_rgba(255,255,255,0.8)] drop-shadow-[0_10px_10px_rgba(255,255,255,0.8)]"
          >
            {item.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

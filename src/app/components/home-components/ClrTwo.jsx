"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ClrTwo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const animateDiv = () => {
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false); // Chiude il div dopo 5 secondi
        setTimeout(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % 4); // Passa al div successivo dopo 2 secondi di pausa
        }, 4000); // Pausa di 2 secondi
      }, 10000); // Il div resta aperto per 5 secondi
    };

    animateDiv(); // Avvia l'animazione

    const interval = setInterval(animateDiv, 14000); // 5 secondi aperto + 2 secondi pausa = 7 secondi

    return () => clearInterval(interval); // Pulizia dell'intervallo al dismount del componente
  }, []);

  return (
    <div className="w-full h-[200px] overflow-hidden border-b-2 border-black grid grid-cols-4 relative">
      {["bg-black", "bg-white", "bg-black", "bg-white"].map(
        (bgColor, index) => (
          <motion.div
            key={index}
            className={`h-full ${bgColor}`}
            animate={{
              scaleX: isAnimating && activeIndex === index ? 4 : 1,
              transformOrigin: "center",
              width: isAnimating && activeIndex === index ? "200%" : "100%",
            }}
            transition={{ duration: 0.8 }}
            style={{
              transformOrigin: "center",
              display: "inline-block",
            }}
          />
        )
      )}
    </div>
  );
}

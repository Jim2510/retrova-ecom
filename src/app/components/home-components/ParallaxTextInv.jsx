"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, wrap } from "framer-motion";
import { Belanosima } from "next/font/google";
import { Roboto } from "next/font/google";

const bela = Belanosima({
  weight: ["400", "600", "700"],
  fontDisplay: "swap",
  subsets: ["latin"],
});

const robo = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  fontDisplay: "swap",
  subsets: ["latin"],
});

export default function ParallaxTextInv({ children, baseVelocity = 50 }) {
  const baseX = useMotionValue(0);

  // Wrap text to create an infinite scroll effect
  const x = useTransform(baseX, (v) => `${wrap(-200, -14, v)}%`);

  const directionFactor = useRef(1);

  // Update the scroll position on each animation frame
  useEffect(() => {
    const updatePosition = (delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      // Update direction if needed
      // Currently, it's always moving in one direction, you can modify if needed
      moveBy += directionFactor.current * moveBy;

      baseX.set(baseX.get() + moveBy);
    };

    let lastTimestamp = 0;
    const handleFrame = (timestamp) => {
      if (lastTimestamp) {
        const delta = timestamp - lastTimestamp;
        updatePosition(delta);
      }
      lastTimestamp = timestamp;
      requestAnimationFrame(handleFrame);
    };

    requestAnimationFrame(handleFrame);

    return () => {
      lastTimestamp = 0; // Cleanup when component unmounts
    };
  }, [baseX, baseVelocity]);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className=" " style={{ x }}>
        {Array.from({ length: 28 }, (_, i) => (
          <div
            key={i}
            className={`${bela.className} drop-shadow-2xl inline-block px-10 bg-tertiary py-2`}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

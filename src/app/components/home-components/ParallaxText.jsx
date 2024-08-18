"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, wrap } from "framer-motion";

export default function ParallaxText({ children, baseVelocity = 50 }) {
  const [velocity, setVelocity] = useState(baseVelocity);
  const baseX = useMotionValue(0);

  // Wrap text to create an infinite scroll effect
  const x = useTransform(baseX, (v) => `${wrap(-200, -14, v)}%`);

  const directionFactor = useRef(1);

  // Update velocity based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Adjust the velocity based on whether it's mobile or desktop
      if (window.matchMedia("(max-width: 768px)").matches) {
        // Mobile devices
        setVelocity(baseVelocity * 6.5); // Increase speed for mobile
      } else {
        // Desktop devices
        setVelocity(baseVelocity);
      }
    };

    handleResize(); // Call initially to set the right velocity
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [baseVelocity]);

  // Update the scroll position on each animation frame
  useEffect(() => {
    const updatePosition = (delta) => {
      let moveBy = directionFactor.current * velocity * (delta / 1000);

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
  }, [baseX, velocity]);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className="scroller" style={{ x }}>
        {Array.from({ length: 28 }, (_, i) => (
          <div
            key={i}
            className="inline-block px-10 font-extrabold tracking-widest py-2"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

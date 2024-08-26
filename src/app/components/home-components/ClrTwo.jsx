"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ClrTwo() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full h-[200px] overflow-hidden border-y-2 border-black grid grid-cols-4 relative">
      {["bg-orange-400", "bg-green-400", "bg-red-400", "bg-slate-400"].map(
        (bgColor, index) => (
          <motion.div
            key={index}
            className={`h-full ${bgColor}`}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            animate={{
              scaleX: hovered === index ? 4 : 1, // Adjust scaleX to cover the grid
              transformOrigin: "center", // Center the scaling effect
              width: hovered === index ? "200%" : "100%", // Full width when hovered, otherwise default
            }}
            transition={{ duration: 0.8 }}
            style={{
              transformOrigin: "center", // Ensure transform origin is set to center
              display: "inline-block", // Prevent div from stretching height-wise
            }}
          />
        )
      )}
    </div>
  );
}

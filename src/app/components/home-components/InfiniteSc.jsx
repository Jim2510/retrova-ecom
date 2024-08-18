"use client";

import ParallaxText from "./ParallaxText";

export default function InfiniteSc({ children }) {
  return (
    <div className="w-full h-[100px] font-extrabold text-6xl flex justify-center items-center">
      <ParallaxText baseVelocity={1}>{children}</ParallaxText>
    </div>
  );
}

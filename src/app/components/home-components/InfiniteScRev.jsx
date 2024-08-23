"use client";

import ParallaxText from "./ParallaxText";

export default function InfiniteScRev({ children, clr, txt }) {
  return (
    <div className="w-full h-[100px]">
      <div
        className={`text-6xl font-extrabold flex justify-center items-center ${clr} ${txt} py-1 elegantshadow`}
      >
        <ParallaxText baseVelocity={-1}>{children}</ParallaxText>
      </div>
    </div>
  );
}

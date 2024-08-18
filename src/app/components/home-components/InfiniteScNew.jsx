"use client";

import ParallaxText from "./ParallaxText";

export default function InfiniteScNew({ children }) {
  return (
    <div className="w-full h-[100px] mb-4">
      <div className="text-6xl flex justify-center font-extrabold items-center text-black py-1">
        <ParallaxText baseVelocity={1}>{children}</ParallaxText>
      </div>
    </div>
  );
}

"use client";

import ParallaxText from "./ParallaxText";
import { Rubik_Mono_One } from "next/font/google";
import { Roboto } from "next/font/google";

const bela = Rubik_Mono_One({
  weight: ["400"],
  fontDisplay: "swap",
  subsets: ["latin"],
});

const robo = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  fontDisplay: "swap",
  subsets: ["latin"],
});

export default function InfiniteScRev({ children, clr, txt }) {
  return (
    <div className="w-full h-[100px]">
      <div
        className={`text-6xl ${bela.className} flex justify-center items-center ${clr} ${txt} pt-3`}
      >
        <ParallaxText baseVelocity={-1}>{children}</ParallaxText>
      </div>
    </div>
  );
}

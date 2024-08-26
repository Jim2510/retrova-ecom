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

export default function InfiniteSc({ children }) {
  return (
    <div
      className={`${bela.className} w-full h-[100px] text-6xl flex justify-center items-center pt-1`}
    >
      <ParallaxText baseVelocity={1}>{children}</ParallaxText>
    </div>
  );
}

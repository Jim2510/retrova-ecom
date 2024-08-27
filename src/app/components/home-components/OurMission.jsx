"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import c1 from "../../../../public/images/c1.png";
import c2 from "../../../../public/images/c2.png";
import c3 from "../../../../public/images/c3.png";
import c4 from "../../../../public/images/c4.png";
import Link from "next/link";
import { Belanosima } from "next/font/google";
import { Roboto } from "next/font/google";
import { Rubik } from "next/font/google";

const bela = Belanosima({
  weight: ["400", "600", "700"],
  fontDisplay: "swap",
  subsets: ["latin"],
});

const arch = Rubik({
  weight: ["400", "600"],
  fontDisplay: "swap",
  subsets: ["latin"],
});

const robo = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  fontDisplay: "swap",
  subsets: ["latin"],
});

export default function OurMission() {
  const [video, setVideo] = useState(false);

  const toggleVideo = () => {
    console.log("Toggle video state");
    setVideo(!video);
  };

  const collections = [
    { img: c1, path: "/categories/necklaces" },
    { img: c2, path: "/categories/bracelets" },
    { img: c3, path: "/categories/earrings" },
    { img: c4, path: "/categories/rings" },
  ];

  return (
    <>
      <div
        className={`${arch.className} flex flex-col justify-center items-center h-[900px] sm:gap-0 gap-0`}
      >
        {/* <div className="w-full h-fit sm:h-[500px] sm:rounded-2xl grid sm:grid-cols-1 grid-cols-1"> */}
        {/* <div className="w-full sm:h-full h-[500px] bg-cover grid sm:grid-cols-4 grid-cols-2 gap-2 px-2 sm:px-10 pb-2 sm:pb-10">
            {collections.map((img, i) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                key={i}
                className=" shadow-2xl bg-white grid grid-cols-1 overflow-hidden sm:rounded-2xl"
              >
                <Link href={img.path}>
                  <Image
                    src={img.img}
                    alt="ab1"
                    className=" hover:scale-110 transition-all ease-in-out h-full object-cover"
                  />
                </Link>
              </motion.div>
            ))}
          </div> */}
        {/* <div className="w-full h-[500px] sm:h-full bg-bright bg-cover hidden"></div> */}
        {/* </div> */}
        <div className="w-full h-[900px] rounded-b-[2rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full h-[900px] overflow-hidden">
            <div
              className="relative group sm:order-1 order-2"
              onMouseEnter={toggleVideo}
              onMouseLeave={toggleVideo}
            >
              <motion.div className=" absolute w-full h-full z-[11]"></motion.div>
              <motion.video
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                loop
                muted
                autoPlay
                type="video/mp4"
                className="w-full object-fill h-[900px] sm:h-full z-[10]"
              >
                <source type="video/mp4" src="/video/mainVid.mp4" />
              </motion.video>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 sm:order-2 flex justify-center items-center p-20 text-center sm:h-full h-[500px]"
            >
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wider text-black">
                {/* ALL OF OUR PRODUCTS ARE DESIGNED TO MEET THE HIGHEST
                SUSTAINABILITY STANDARDS */}
                All of our products are designed to meet the highest
                sustanibility standard.
              </h2>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

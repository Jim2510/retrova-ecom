"use client";

import { motion } from "framer-motion";
import instagram from "../../../../public/instagram (1).png";
import x from "../../../../public/twitter (1).png";
import facebook from "../../../../public/facebook.png";
import Image from "next/image";

export default function NavSocial({ scrollY }) {
  const isHidden = scrollY > 50;

  return (
    <motion.div
      initial={{ y: -42, opacity: 1 }}
      animate={{ y: isHidden ? -42 : 0 }}
      transition={{ duration: 0.6 }}
      className="z-20 w-full h-[42px] bg-nav fixed justify-start items-center flex"
    >
      <div className="grid grid-cols-3 justify-self-start px-4 gap-4">
        <div>
          <Image
            src={instagram}
            className="w-[20px] h-[20px] invert"
            alt="Instagram"
          />
        </div>
        <div>
          <Image src={x} className="w-[20px] h-[20px] invert" alt="Twitter" />
        </div>
        <div>
          <Image
            src={facebook}
            className="w-[20px] h-[20px] invert"
            alt="Facebook"
          />
        </div>
      </div>
      <p className="absolute w-full text-end sm:pr-0 pr-4 sm:text-center font-extrabold text-white sm:text-base text-xs">
        Retrova - Official Store
      </p>
    </motion.div>
  );
}

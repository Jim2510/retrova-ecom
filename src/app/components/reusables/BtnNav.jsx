"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BtnNav({ buttonText, urlNav }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="sm:flex hidden text-center text-sm justify-center items-center h-fit "
      >
        <Link href={urlNav} className="w-full h-full">
          {buttonText}
        </Link>
      </motion.div>
    </>
  );
}

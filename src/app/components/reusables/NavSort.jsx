"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import arrow from "../../../../public/icons/down-arrow.png";
import Image from "next/image";

export default function NavSort({ scrollY }) {
  const isSticky = scrollY > 50;
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.div
        initial={{ y: -35 }}
        animate={{ y: isSticky ? 55 : 118 }}
        transition={{ duration: 0.5 }}
        className={`w-full z-[10] h-[30px] -top-1 bg-tertiary flex justify-between items-center ${
          isSticky ? "fixed" : "absolute"
        }`}
      >
        <div className="flex justify-center items-center pl-4 gap-4">
          <label htmlFor="sort" className="font-bold text-xs">
            SORT BY
          </label>
          <select name="sort" id="sort" className="min-w-[100px] rounded-2xl">
            <option value="">Option 1</option>
            <option value="">Option 2</option>
            <option value="">Option 3</option>
          </select>
          <div className="relative ml-10 flex justify-center items-center gap-4">
            <p className="font-bold text-xs">FILTERS</p>
            <button
              className="flex justify-center items-center"
              onClick={toggleFilter}
            >
              <Image src={arrow} width={15} height={15} alt="Toggle Filters" />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ x: -500 }}
                  animate={{ x: 0 }}
                  exit={{ x: -500 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -z-10 w-[300px] h-[350px] top-full bg-white mt-2 rounded-2xl shadow-2xl"
                >
                  {/* Content of the filter dropdown */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
}

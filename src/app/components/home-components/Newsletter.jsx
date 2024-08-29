"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Newsletter() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Controlla se il banner è stato chiuso precedentemente
    const bannerClosed = localStorage.getItem("newsletterBannerClosed");
    if (bannerClosed) {
      setOpen(false);
    }
  }, []);

  const toggleNews = () => {
    setOpen(false);
    // Memorizza nello storage che il banner è stato chiuso
    localStorage.setItem("newsletterBannerClosed", "true");
  };

  return (
    <>
      <motion.div
        className={`w-full absolute h-full z-30 bg-white/40 backdrop-blur-sm ${
          open ? "flex" : "hidden"
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="sticky w-full sm:w-[40%] sm:h-[300px] h-[400px] bg-white left-[30%] top-[30%] p-4"
        >
          <div className="border-[1px] border-tertiary h-full flex flex-col justify-center items-center text-center pt-10">
            <h3 className="text-[1.70rem] font-semibold mb-2">
              ISCRIVITI ALLA NOSTRA NEWSLETTER
            </h3>
            <p>
              Resta aggiornato/a sulle nostre nuove offerte e promozioni,
              riceverai tantissimi coupon in esclusiva
            </p>
            <form className="px-20">
              <input
                type="text"
                name=""
                id="mail"
                className="focus:outline-none my-4 border-2 border-black w-full p-1 rounded-lg text-center"
                placeholder="Inserisci qui la tua mail"
              />
              <button className="mt-3 py-2 px-4 bg-tertiary/70 rounded-lg text-sm font-semibold">
                ISCRIVITI
              </button>
            </form>
            <div className="absolute right-10 bottom-8">
              <button
                onClick={toggleNews}
                className="mt-3 py-2 px-4 rounded-lg text-xs font-semibold"
              >
                magari dopo
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

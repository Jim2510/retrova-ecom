"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CardHome({
  nomeP,
  img,
  imgHover,
  info,
  prezzo,
  index,
}) {
  const productId = index; // Usa l'indice o l'ID del prodotto

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="min-h-[400px] px-1"
      >
        <Link href={`/prods/${encodeURIComponent(productId)}`}>
          <div className="bg-white border-b-[2px] border-black z-10 group h-[300px] sm:h-[400px] flex justify-center items-center gap-2 overflow-hidden relative">
            {/* Prima immagine */}
            <Image
              width={400}
              height={430}
              src={img}
              alt="card"
              className="bg-white group-hover:opacity-0 transition-opacity duration-500 ease-in-out object-contain w-full h-full absolute z-[05]"
            />
            {/* Seconda immagine che appare al passaggio del mouse */}
            <Image
              width={400}
              height={430}
              src={imgHover}
              alt="hover image"
              className="bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out object-contain w-full h-full absolute z-[05]"
            />
          </div>
        </Link>

        <div className="px-4 font-semibold text-sm py-2">
          <h2>
            {nomeP} - {info}
          </h2>
          <p>{prezzo}€</p>
        </div>
      </motion.div>
    </>
  );
}

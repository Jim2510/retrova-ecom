"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CardHome({ nomeP, img, info, prezzo, desc, index }) {
  const productId = index; // Just use the index or actual product ID here

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
          <div className="bg-white border-b-[2px] border-black z-10 group h-[300px] sm:h-[400px] flex justify-center items-center gap-2 overflow-hidden">
            <Image
              width={400}
              height={430}
              src={img}
              alt="card"
              className="bg-white group-hover:scale-110 transition-all ease-in-out object-contain w-full h-full relative z-[05]"
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

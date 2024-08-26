import { motion } from "framer-motion";
import Image from "next/image";

export default function CardProd({ img, nomeP }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="col-span-1 h-[500px] grid grid-cols-1 grid-rows-10"
      >
        <Image
          src={img}
          className="row-span-9 h-full"
          alt="img"
          fill="contain"
          objectFit="cover"
        />
        <div className="w-full flex flex-col row-span-1 border-b-2 border-x-2 border-black">
          <div className="w-full text-start">
            <p>{nomeP}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

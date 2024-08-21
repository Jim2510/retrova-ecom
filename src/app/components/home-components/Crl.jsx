"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import b1 from "../../../../public/images/1.png";
import b2 from "../../../../public/images/2.png";
import b3 from "../../../../public/images/3.png";
import b1r from "../../../../public/images/1r.png";
import b2r from "../../../../public/images/2r.png";
import b3r from "../../../../public/images/3r.png";

const desktopImages = [b1, b2, b3];
const mobileImages = [b1r, b2r, b3r];

export default function Crl() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imageArray = isMobile ? mobileImages : desktopImages;

  // Aggiungi il video come ultima slide
  const finalArray = [...imageArray, { type: "video", src: "/video/pres.mp4" }];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === finalArray.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia immagine ogni 5 secondi

    return () => clearInterval(interval);
  }, [finalArray]);

  const handleSwipe = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex === finalArray.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === "right") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? finalArray.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="w-full h-screen relative mt-[2.5rem] overflow-hidden mb-4">
      <AnimatePresence initial={false}>
        {finalArray.map(
          (item, index) =>
            currentIndex === index && (
              <motion.div
                key={index}
                className="absolute w-full h-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                onPanEnd={(e, { offset, velocity }) => {
                  if (Math.abs(velocity.x) > 200) {
                    handleSwipe(offset.x < 0 ? "left" : "right");
                  }
                }}
              >
                {item.type === "video" ? (
                  <motion.video
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    loop
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                  >
                    <source type="video/mp4" src={item.src} />
                  </motion.video>
                ) : (
                  <Image
                    src={item}
                    alt={`Slide ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="w-full h-full"
                  />
                )}
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
}

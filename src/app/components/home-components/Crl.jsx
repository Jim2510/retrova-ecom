"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import b1 from "../../../../public/images/1.png";
import b2 from "../../../../public/images/2.png";
import b3 from "../../../../public/images/3.png";
import b1r from "../../../../public/images/1r.png";
import b2r from "../../../../public/images/2r.png";
import b3r from "../../../../public/images/3r.png";

const desktopImages = [b1, b2, b3];
const mobileImages = [b1r, b2r, b3r];

export default function Crl() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hideContainer, setHideContainer] = useState(false);
  const [images, setImages] = useState(desktopImages);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setImages(mobileImages);
      } else {
        setImages(desktopImages);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const variants = {
    open: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 1, ease: "easeInOut" },
    },
    closed: {
      clipPath: "inset(50% 0% 50% 0%)",
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      setHideContainer(true);
    }
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50; // Soglia di swipe
    const velocityThreshold = 0.2; // Velocità di swipe per decidere la transizione

    if (
      Math.abs(info.offset.x) > swipeThreshold ||
      Math.abs(info.velocity.x) > velocityThreshold
    ) {
      if (
        info.offset.x < -swipeThreshold ||
        info.velocity.x < -velocityThreshold
      ) {
        nextSlide();
      } else if (
        info.offset.x > swipeThreshold ||
        info.velocity.x > velocityThreshold
      ) {
        prevSlide();
      }
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <>
      <AnimatePresence>
        {!hideContainer && isVisible && (
          <motion.div
            className="fixed top-0 z-50 w-full h-screen"
            variants={variants}
            initial="open"
            animate="open"
            exit="closed"
            onClick={handleClose}
            onAnimationComplete={handleAnimationComplete}
          >
            <video
              autoPlay
              muted
              loop
              controls={false}
              className="w-full h-full object-cover"
            >
              <source src="/video/pres.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-screen relative overflow-hidden sm:mt-[7.5rem]">
        <motion.div
          className="absolute inset-0 flex"
          style={{ width: "100%", height: "100%" }}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          drag="x"
          dragElastic={0.1}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
        >
          {images.map((image, index) => (
            <div
              className="w-full h-full flex-shrink-0 relative px-10"
              key={index}
            >
              <Image
                src={image}
                alt={`Slide ${index}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}

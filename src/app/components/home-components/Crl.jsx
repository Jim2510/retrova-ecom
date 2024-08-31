"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import b1 from "../../../../public/images/banner.png";
import b1r from "../../../../public/images/bn1.png";

const desktopImages = [b1];
const mobileImages = [b1r];

export default function Crl() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState(desktopImages);

  useEffect(() => {
    // Update the images based on the screen width
    const updateImages = () => {
      if (window.innerWidth <= 768) {
        setImages(mobileImages);
      } else {
        setImages(desktopImages);
      }
    };

    // Initial check
    updateImages();

    // Add event listener to handle window resize
    window.addEventListener("resize", updateImages);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", updateImages);
    };
  }, []);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    const velocityThreshold = 0.2;

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
    <div className="w-full h-screen relative overflow-hidden sm:mt-[7.5rem] ">
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
  );
}

"use client";

import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
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
  const [currentImage, setCurrentImage] = useState(desktopImages[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to handle image change
    const changeImage = () => {
      setCurrentImage((prevImage) => {
        const imageArray = isMobile ? mobileImages : desktopImages;
        const currentIndex = imageArray.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % imageArray.length;
        return imageArray[nextIndex];
      });
    };

    // Function to handle resize
    const handleResize = () => {
      const isMobileScreen = window.innerWidth < 768;
      if (isMobile !== isMobileScreen) {
        setIsMobile(isMobileScreen);
        // Update the current image to match the new screen size
        setCurrentImage((prevImage) => {
          const imageArray = isMobileScreen ? mobileImages : desktopImages;
          const currentIndex = imageArray.indexOf(prevImage);
          return imageArray[currentIndex] !== undefined
            ? imageArray[currentIndex]
            : imageArray[0];
        });
      }
    };

    // Initial check to set the correct image and state
    handleResize();

    // Set interval for image change
    const intervalId = setInterval(changeImage, 10000);

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup interval and event listener
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div className="w-full h-screen relative top-0 mt-[7.8rem] overflow-hidden mb-4">
      <div className="w-full h-full relative">
        <Image
          src={currentImage}
          alt="Carousel Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

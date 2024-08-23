"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/reusables/Navbar";
import NavSocial from "./components/reusables/NavSocial";
import Crl from "./components/home-components/Crl";
import CategoryCont from "./components/home-components/CategoryCont";
import InfiniteSc from "./components/home-components/InfiniteSc";
import InfiniteScRev from "./components/home-components/InfiniteScRev";
import Cart from "./components/cart/Cart";
import InfiniteScNew from "./components/home-components/InfiniteScNew";
import OurMission from "./components/home-components/OurMission";
import Ftr from "./components/reusables/Ftr";
import Newsletter from "./components/home-components/Newsletter";
import Chatbot from "./components/chatbot/Chatbot";
import { Montserrat } from "next/font/google";
import Client from "shopify-buy";
import useSWR from "swr";
import { storefront } from "../../utilis";
import { productsQuery } from "../app/api/getProducts";
import diamond from "../../public/icons/diamond.png";
import Image from "next/image";

const plex = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  fontDisplay: "swap",
  subsets: ["latin"],
});

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main
      className={`${plex.className} font-sans min-h-screen flex flex-col items-center relative`}
    >
      <Newsletter />
      <NavSocial scrollY={scrollY} />
      <Navbar
        toggleOpen={toggleOpen}
        scrollY={scrollY}
        bgNav={"bg-transparent"}
      />
      <Crl />
      {/* <InfiniteScRev clr={"bg-transparent"} txt={"text-black"}>
        <div className="flex gap-10">
          COLLECTIONS{" "}
          <Image
            src={diamond}
            alt="diamond"
            width={55}
            height={30}
            className="sm:ml-5 -ml-3"
          />
        </div>
      </InfiniteScRev> */}
      <OurMission />
      <InfiniteSc>
        <div className="flex gap-10">NEW</div>
      </InfiniteSc>
      <CategoryCont />
      <InfiniteScRev clr={"bg-transparent"} txt={"text-black"}>
        <div className="flex gap-10">OFFERS</div>
      </InfiniteScRev>
      <CategoryCont />
      <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
      <InfiniteSc>
        <div className="flex gap-10">SALES</div>
      </InfiniteSc>
      <CategoryCont />
      <Chatbot />
      <Ftr />
    </main>
  );
}

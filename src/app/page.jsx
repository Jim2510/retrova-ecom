"use client";
// import { useState, useEffect } from "react";
// import Navbar from "./components/reusables/Navbar";
// import NavSocial from "./components/reusables/NavSocial";
// import Crl from "./components/home-components/Crl";
// import CategoryCont from "./components/home-components/CategoryCont";
// import InfiniteSc from "./components/home-components/InfiniteSc";
// import InfiniteScRev from "./components/home-components/InfiniteScRev";
// import Cart from "./components/cart/Cart";
// import OurMission from "./components/home-components/OurMission";
// import Ftr from "./components/reusables/Ftr";
// import Newsletter from "./components/home-components/Newsletter";
// import { Montserrat } from "next/font/google";
// import logo from "../../public/images/logo.png";
// import Image from "next/image";
// import ClrTwo from "./components/home-components/ClrTwo";
// import Bnr from "./components/home-components/Bnr";

// const plex = Montserrat({
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
//   fontDisplay: "swap",
//   subsets: ["latin"],
// });

export default function Home() {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [scrollY, setScrollY] = useState(0);

  //   const toggleOpen = () => {
  //     setIsOpen(!isOpen);
  //   };

  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  return (
    <div className=""></div>
    // <main
    //   className={`${plex.className} font-sans min-h-screen flex flex-col items-center relative`}
    // >
    //   <Newsletter />
    //   <NavSocial scrollY={scrollY} />
    //   <Navbar
    //     toggleOpen={toggleOpen}
    //     scrollY={scrollY}
    //     bgNav={"bg-transparent"}
    //   />
    //   <Crl />
    //   <InfiniteSc>
    //     <div className="flex gap-10 justify-center items-center">
    //       NEW
    //       <Image src={logo} width={80} height={50} className="ml-5 mb-2" />
    //     </div>
    //   </InfiniteSc>

    //   <CategoryCont />

    //   <OurMission />
    //   <InfiniteScRev clr={"bg-transparent"} txt={"text-black"}>
    //     <div className="flex sm:gap-10">
    //       BEST SELLERS{" "}
    //       <Image
    //         src={logo}
    //         width={80}
    //         height={50}
    //         className="sm:ml-5 relative bottom-3"
    //       />
    //     </div>
    //   </InfiniteScRev>
    //   <CategoryCont />
    //   <InfiniteSc>
    //     <div className="flex sm:gap-10">
    //       CATEGORIES{" "}
    //       <Image
    //         src={logo}
    //         width={50}
    //         height={50}
    //         className="ml-5 scale-[1.3] relative bottom-1"
    //       />
    //     </div>
    //   </InfiniteSc>
    //   <Bnr />
    //   <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
    //   <InfiniteScRev clr={"bg-transparent"} txt={"text-black"}>
    //     <div className="flex sm:gap-10">
    //       SALES{" "}
    //       <Image
    //         src={logo}
    //         width={50}
    //         height={50}
    //         className="ml-5 scale-[1.3] relative bottom-1"
    //       />
    //     </div>
    //   </InfiniteScRev>
    //   <CategoryCont />
    //   <Ftr />
    // </main>
  );
}

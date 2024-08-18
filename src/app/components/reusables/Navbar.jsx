"use client";

import { motion } from "framer-motion";
import BtnNav from "./BtnNav";
import cart from "../../../../public/icons/shopping-cart.png";
import sort from "../../../../public/icons/menu.png";
import user from "../../../../public/icons/user.png";
import search from "../../../../public/icons/active.png";
import logo from "../../../../public/images/logo.png";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ toggleOpen, scrollY }) {
  const btnArray = [
    { title: "HOME", url: "/" },
    { title: "PRODUCTS", url: "/prods" },
    { title: "OFFERS", url: "/offers" },
    { title: "INFO", url: "/info" },
  ];
  const [openSearch, setOpenSearch] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  //
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const toggleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };

  const isSticky = scrollY > 50;

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isSticky ? -0 : 43 }}
      transition={{ duration: 0.6 }}
      className={`z-[15] top-0 w-full bg-white grid grid-cols-2 sm:grid-cols-3 justify-between sm:justify-start items-center fixed`}
      style={{ height: isSticky ? "55px" : "75px" }}
    >
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: openSearch ? -100 : 0 }}
        transition={{ duration: 0.4 }}
        className={`absolute w-full h-full z-[15] bg-white flex justify-center items-center`}
      >
        <div className="relative w-[50%]">
          <input
            type="text"
            className="w-full focus:outline-none p-2 border-[3px] border-black rounded-2xl"
          />
          <button
            onClick={toggleOpenSearch}
            className="absolute top-0 right-0 w-[40px] h-[35px] text-2xl font-semibold text-gray-600 transition-all ease-in-out"
          >
            <Image
              src={search}
              alt="search"
              width={20}
              height={20}
              className="absolute top-3 right-3"
            />
          </button>
        </div>
      </motion.div>
      <Link
        href={"/"}
        className="h-full flex justify-start items-center sm:pl-10 pl-2 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: isSticky ? 1 : 1.2 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={logo}
            alt="logo"
            width={130}
            height={42}
            className="sm:pl-0 pl-3 sm:w-[150px]"
          />
        </motion.div>
      </Link>
      <div
        className={`${
          isSticky ? "mt-0" : "mt-2"
        } font-semibold text-base h-full grid-cols-5 justify-center items-center -ml-60 sm:grid hidden w-[400px]`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="group hidden sm:flex justify-center items-center text-center text-xs px-2 py-[0.3rem] bg-tertiary font-bold border-b-4 border-black border-l-0 border-r-[3px] rounded-tl-2xl rounded-br-2xl hover:border-none transition-all ease-in-out"
        >
          <motion.button className="rounded-tl-2xl rounded-br-2xl w-full h-full mx-4">
            NEW
          </motion.button>
        </motion.div>
        {btnArray.map((btn, index) => (
          <BtnNav urlNav={btn.url} buttonText={btn.title} key={index} />
        ))}
      </div>
      <div className="flex justify-end sm:pr-10 pr-2 items-center gap-4">
        <button className="group w-[40px] pt-1 transition-all ease-in-out rounded-lg flex justify-center items-center">
          <Image
            onClick={toggleOpenSearch}
            src={search}
            alt="search"
            width={20}
            height={20}
            className="group-hover:scale-125 transition-all ease-in-out"
          />
        </button>
        <div className="cursor-pointer group pt-1 w-[40px] h-[35px] transition-all ease-in-out rounded-lg flex sm:hidden justify-center items-center">
          <Image
            src={sort}
            alt="menu"
            width={20}
            height={20}
            onClick={toggleMenu}
            className="group-hover:scale-125 transition-all ease-in-out"
          />
          <motion.div
            initial={{ x: "-140%" }}
            animate={{ x: openMenu ? 0 : "-140%" }}
            transition={{ duration: 0.6 }}
            className={`left-0 absolute w-screen translate-y-1/2 -top-[15px] h-[30vh] ${
              isSticky ? "mt-[70px]" : "mt-[85px]"
            }  grid grid-rows-4 bg-white`}
          >
            {btnArray.map((btn, index) => (
              <Link
                href={btn.url}
                key={index}
                className="w-full text-center border-t-2 border-tertiary font-bold flex justify-center items-center"
              >
                {btn.title}
              </Link>
            ))}
          </motion.div>
        </div>
        <div className="cursor-pointer group w-[40px] pt-1 h-[35px] transition-all ease-in-out  rounded-lg flex justify-center items-center">
          <Image
            src={user}
            alt="user"
            width={25}
            height={25}
            className="group-hover:scale-125 transition-all ease-in-out"
          />
        </div>
        <div
          onClick={toggleOpen}
          className="cursor-pointer group w-[40px] h-[35px] transition-all ease-in-out rounded-lg flex pt-1 justify-center items-center"
        >
          <Image
            alt="cart"
            src={cart}
            width={25}
            height={25}
            className="group-hover:scale-125 transition-all ease-in-out"
          />
        </div>
      </div>
    </motion.nav>
  );
}

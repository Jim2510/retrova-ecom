"use client";

import { motion } from "framer-motion";
import BtnNav from "./BtnNav";
import cart from "../../../../public/icons/shopping-cart.png";
import sort from "../../../../public/icons/menu.png";
import search from "../../../../public/icons/active.png";
import logo from "../../../../public/images/logo.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { loadCart, searchByName } from "../../../../utilis/query";
import { storefront } from "../../../../utilis";

export default function Navbar({ toggleOpen, scrollY }) {
  const btnArray = [
    { title: "HOME", url: "/" },
    { title: "PRODUCTS", url: "/prods" },
    { title: "OFFERS", url: "/offers" },
    { title: "INFO", url: "/info" },
  ];

  const [openSearch, setOpenSearch] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [localCart, setLocalCart] = useState({ id: null, lines: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;

    try {
      const data = await storefront(searchByName, { title: searchQuery });

      if (data) {
        setSearchResults(data);
      } else {
        console.error("Search error:", data.error);
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
      setSearchResults([]);
    }
  };

  console.log(searchResults);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = JSON.parse(
          window.localStorage.getItem("retrovaconf:shopify:cart")
        );
        if (data) {
          const existingCart = await storefront(loadCart, {
            cartId: data.data.cartCreate.cart.id,
          });

          const cartData = await existingCart.json();

          setLocalCart({
            id: data.data.cartCreate.cart.id,
            checkoutUrl: data.data.cartCreate.cart.checkoutUrl,
            estimatedCost: cartData.data.cart.estimatedCost.totalAmount.amount,
            lines: cartData.data.cart.lines.edges,
          });

          return;
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();

    const handleStorageChange = (event) => {
      if (
        event.key === "retrovaconf:shopify:status" &&
        event.newValue === "dirty"
      ) {
        fetchCart();
        window.localStorage.setItem("retrovaconf:shopify:status", "clean");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const toggleOpenSearch = () => {
    setOpenSearch(!openSearch);
    setSearchResults([]); // Resetta i risultati di ricerca quando chiudi la barra di ricerca
    setSearchQuery("");
  };

  const isSticky = scrollY > 50;

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isSticky ? -0 : 42 }}
      transition={{ duration: 0.6 }}
      className={`z-[15] top-0 w-full bg-transparent sm:bg-white grid grid-cols-2 sm:grid-cols-3 justify-between sm:justify-start items-center fixed`}
      style={{ height: isSticky ? "55px" : "75px" }}
    >
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: openSearch ? -100 : 0 }}
        transition={{ duration: 0.4 }}
        className={`absolute w-full h-full z-[15] sm:mt-0 -mt-2 bg-white/20 backdrop-blur-3xl flex justify-center items-center`}
      >
        <div className="absolute w-full flex justify-center items-center bg-white mt-20">
          {searchResults?.data?.products?.edges?.length > 0 ? (
            <div className="search-results absolute -top-1 bg-white w-full text-sm flex justify-center sm:justify-between items-center flex-col">
              {searchResults.data.products.edges.map((el) => (
                <Link
                  href={`/prods/${el.node.id}`}
                  key={el.node.id}
                  className="w-[400px] px-10"
                >
                  <div
                    key={el.node.id}
                    className="flex  justify-center text-start items-center gap-20 w-fit "
                  >
                    <Image
                      src={el.node.images.edges[0].node.originalSrc}
                      alt={el.node.images.edges[0].node.altText}
                      width={50}
                      height={50}
                    />
                    <h2 className="">{el.node.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            searchQuery.trim() && (
              <p className="text-center font-semibold text-black">
                No results found
              </p>
            )
          )}
        </div>
        <div className="relative w-[70%] sm:w-[50%]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full focus:outline-none p-2 border-[2px] border-black rounded-sm"
          />
          <button
            onClick={handleSearch}
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
        <button
          onClick={toggleOpenSearch}
          className="absolute text-2xl font-bold right-3 focus:outline-none"
        >
          X
        </button>
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
            className="sm:pl-0 pl-3 sm:w-[150px] sm:flex hidden"
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
            }  grid grid-rows-4 bg-white/20 backdrop-blur-3xl`}
          >
            {btnArray.map((btn, index) => (
              <Link
                href={btn.url}
                key={index}
                className="w-full text-center border-b-[1px] border-black/40 font-bold flex justify-center items-center"
              >
                {btn.title}
              </Link>
            ))}
          </motion.div>
        </div>
        <div
          onClick={toggleOpen}
          className="relative cursor-pointer group w-[40px] h-[35px] transition-all ease-in-out rounded-lg flex pt-1 justify-center items-center"
        >
          <Image
            alt="cart"
            src={cart}
            width={25}
            height={25}
            className="group-hover:scale-125 transition-all ease-in-out"
          />
          {localCart.lines.length > 0 &&
            localCart.lines[0].node.quantity !== 0 && (
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-black font-semibold flex justify-center items-center p-2">
                <span className="flex justify-center items-center text-white bg-black rounded-full absolute text-[0.60rem]">
                  {localCart.lines[0].node.quantity}
                </span>
              </div>
            )}
        </div>
      </div>
    </motion.nav>
  );
}

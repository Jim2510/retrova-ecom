"use client";

import { motion } from "framer-motion";
import BtnNav from "./BtnNav";
import cart from "../../../../public/icons/shopping-cart.png";
import sort from "../../../../public/icons/menu.png";
import search from "../../../../public/icons/active.png";
import useric from "../../../../public/icons/user.png";
import logo from "../../../../public/images/logo.svg";
import logoMobile from "../../../../public/images/logo.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { loadCart, searchByName } from "../../../../utilis/query";
import { storefront } from "../../../../utilis";
import { Belanosima } from "next/font/google";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/authSlice";

const bela = Belanosima({
  weight: ["400", "600", "700"],
  fontDisplay: "swap",
  subsets: ["latin"],
});

export default function Navbar({ toggleOpen, scrollY, bgNav }) {
  const btnArray = [
    { title: "HOME", url: "/" },
    { title: "PRODUCTS", url: "/prods" },
    { title: "OFFERS", url: "/offers" },
    { title: "INFO", url: "/info" },
  ];

  const [openSearch, setOpenSearch] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCategories, setOpenCategories] = useState(false); // State for categories menu
  const [localCart, setLocalCart] = useState({ id: null, lines: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const [openUser, setOpenUser] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDesktop) {
        setImageSrc(logo);
      } else {
        setImageSrc(logoMobile);
      }
    }, 50); // Delay of 50ms to ensure proper image load without flicker

    return () => clearTimeout(timer);
  }, [isDesktop]);

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

  const toggleCategories = () => {
    setOpenCategories(!openCategories);
  };

  const toggleOpenSearch = () => {
    setOpenSearch(!openSearch);
    setSearchResults([]); // Resetta i risultati di ricerca quando chiudi la barra di ricerca
    setSearchQuery("");
  };

  const isSticky = scrollY > 50;

  console.log(user);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isSticky ? -0 : 42 }}
      transition={{ duration: 0.6 }}
      className={`z-[15] top-0 w-full ${bgNav} ${bela.className} sm:bg-white/30 sm:backdrop-blur-xl grid grid-cols-2 sm:grid-cols-3 items-center fixed`}
      style={{ height: isSticky ? "55px" : "75px" }}
    >
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: openSearch ? -100 : 0 }}
        transition={{ duration: 0.4 }}
        className={`absolute w-full h-full z-[15] sm:mt-0 -mt-2 bg-white/20 backdrop-blur-3xl flex justify-center items-center`}
      >
        <div className="absolute w-full flex justify-center items-center bg-white mt-[4rem]">
          {searchResults?.data?.products?.edges?.length > 0 ? (
            <div className="search-results absolute -top-1 bg-white w-full text-sm flex justify-center sm:justify-between items-center flex-col">
              {searchResults.data.products.edges.map((el) => (
                <Link
                  href={`/prods/${encodeURIComponent(el.node.id)}`}
                  key={el.node.id}
                  className="w-[400px] px-10 py-1"
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
              <div className="flex justify-center items-center">
                <p className=" mr-2 text-center font-semibold text-black">
                  press
                </p>
                <Image
                  src={search}
                  alt="search"
                  width={10}
                  height={10}
                  className=""
                />
                <p className="ml-2 text-center font-semibold text-black">
                  to search
                </p>
              </div>
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
          className="absolute text-2xl text-black font-semibold right-3 focus:outline-none"
        >
          X
        </button>
      </motion.div>
      <Link
        href={"/"}
        className="h-full flex justify-start items-center sm:pl-10 pl-2 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: isSticky ? 1 : 1.2, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={imageSrc}
            alt="logo"
            width={130}
            height={42}
            className={`flex sm:pl-0 pl-3 sm:w-[150px] w-[60px] sm:h-full h-[50px] sm:pb-0 sm:pt-1 mb-1`}
          />
        </motion.div>
      </Link>
      <div
        className={`${
          isSticky ? "mt-0" : "mt-2"
        } font-semibold text-base h-full grid-cols-4 justify-center items-center sm:grid hidden`}
      >
        {btnArray.map((btn, index) => (
          <BtnNav urlNav={btn.url} buttonText={btn.title} key={index} />
        ))}
      </div>
      <div className="flex justify-end sm:pr-10 pr-2 items-center gap-4">
        <button className="bg-white/10 sm:bg-transparent px-0 p-1 group w-[40px] transition-all ease-in-out flex justify-center items-center">
          <Image
            onClick={toggleOpenSearch}
            src={search}
            alt="search"
            width={20}
            height={20}
            className="group-hover:scale-125 transition-all ease-in-out"
          />
        </button>
        <div className="px-0 cursor-pointer group bg-white/10 p-1 w-[40px] transition-all ease-in-out flex sm:hidden justify-center items-center">
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
            className={`left-0 absolute w-full translate-y-1/2 -top-7 h-[5vh] ${
              isSticky ? "mt-[80px]" : "mt-[85px]"
            }  flex backdrop-blur-3xl`}
          >
            {btnArray.map((btn, index) => (
              <Link
                href={btn.url}
                key={index}
                className="w-full text-center sm:text-sm border-b-[1px] border-black text-xs font-extrabold flex justify-center items-center"
              >
                {btn.title}
              </Link>
            ))}
            <div
              onClick={toggleCategories} // Toggle categories on click
              className="relative w-full text-center border-b-[1px] border-black text-xs sm:text-sm font-extrabold flex justify-center items-center cursor-pointer"
            >
              CATEGORIES
            </div>
            <Link
              href="/user"
              className="sm:text-sm text-xs w-full text-center border-b-[1px] border-black font-extrabold flex justify-center items-center"
            >
              USER
            </Link>
          </motion.div>
          <motion.div
            initial={{ x: "350%" }}
            animate={{ x: openCategories ? "50%" : "350%" }}
            transition={{ duration: 0.6 }}
            className={`font-extrabold text-xs absolute w-fit right-[9rem] flex  backdrop-blur-3xl ${
              isSticky ? "top-[5.8rem]" : "top-[6.1rem]"
            }`}
          >
            <Link
              href={"/categories/bracelets"}
              className="py-2 px-2 border-b-[1px] border-black"
            >
              BRACELETS
            </Link>
            <Link
              href={"/categories/necklaces"}
              className="py-2 px-2 border-b-[1px] border-black"
            >
              NECKLACES
            </Link>
            <Link
              href={"/categories/rings"}
              className="py-2 px-2 border-b-[1px] border-black"
            >
              RINGS
            </Link>
            <Link
              href={"/categories/earrings"}
              className="py-2 px-2 border-b-[1px] border-black"
            >
              EARRINGS
            </Link>
          </motion.div>
        </div>
        <div
          onClick={toggleOpen}
          className=" relative cursor-pointer group w-[40px] bg-white/10 sm:bg-transparent p-1 px-0 transition-all ease-in-out flex pt-1 justify-center items-center"
        >
          <Image
            alt="cart"
            src={cart}
            width={20}
            height={20}
            className="group-hover:scale-125 scale-110 transition-all ease-in-out"
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
        <div className="relative cursor-pointer group w-[40px] bg-white/10 sm:bg-transparent p-1 px-0 transition-all ease-in-out flex pt-1 justify-center items-center">
          <Image
            onClick={() => setOpenUser(!openUser)}
            alt="user"
            src={useric}
            width={20}
            height={20}
            className="group-hover:scale-125 transition-all ease-in-out"
          />
          <motion.div
            initial={{ x: "140%" }}
            animate={{ x: openUser ? "29%" : "140%" }}
            transition={{ duration: 0.6 }}
            className={`absolute w-[250px] h-fit bg-white rounded-bl-lg ${
              isSticky ? "top-[2.5rem]" : "top-[3.2rem]"
            }  right-14 sm:right-8 translate-x-1/2`}
          >
            {user ? (
              <div className="flex flex-col justify-center items-center gap-6 py-8">
                <h2 className="text-base font-semibold">{user.email}</h2>
                <Link
                  to="/userOrders"
                  href="/userOrders"
                  className="bg-white rounded-full border-2 font-semibold border-black w-fit px-4"
                >
                  Order History
                </Link>
                <button
                  onClick={handleLogOut}
                  className=" rounded-full border-2 border-black w-fit px-4 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-6 h-full">
                <Link
                  to="/login"
                  href="/login"
                  className="bg-white rounded-full border-2 border-black w-fit px-4"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  href="/register"
                  className="bg-white rounded-full border-2 border-black w-fit px-4"
                >
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}

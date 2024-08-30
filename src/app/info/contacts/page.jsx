"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/reusables/Navbar";
import NavSocial from "../../components/reusables/NavSocial";
import Ftr from "../../components/reusables/Ftr";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../../../store/authSlice";

export default function Contacts() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const user = Cookies.get("user");

    if (accessToken && user) {
      dispatch(
        login({
          accessToken,
          user: JSON.parse(user),
        })
      );
    }
  }, [dispatch]);

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
    <>
      <div className="min-h-screen flex flex-col relative">
        <NavSocial scrollY={scrollY} />
        <Navbar toggleOpen={toggleOpen} scrollY={scrollY} />
        <div className="w-full h-[700px] flex flex-col justify-center items-center mt-10">
          <h1 className="text-6xl font-bold p-20">CONTACT US</h1>
          <form
            action=""
            className="w-[80%] h-[50%] shadow-2xl flex flex-col gap-4 p-4 justify-between"
          >
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 w-full gap-4">
                <input
                  type="text"
                  placeholder="NAME"
                  className="focus:outline-none border-[1px] p-2 text-xl rounded-md focus:border-2 border-black transition-all ease-in-out"
                />
                <input
                  type="text"
                  placeholder="EMAIL*"
                  className="focus:outline-none border-[1px] p-2 text-xl rounded-md focus:border-2 border-black transition-all ease-in-out"
                />
              </div>
              <input
                type="text"
                placeholder="PHONE NUMBER"
                className="focus:outline-none border-[1px] p-2 text-xl rounded-md focus:border-2 border-black transition-all ease-in-out"
              />
              <textarea
                placeholder="YOUR MESSAGE"
                className="focus:outline-none border-[1px] p-2 text-xl rounded-md focus:border-2 border-black transition-all ease-in-out"
              />
            </div>
            <div className="w-full flex justify-center items-center my-auto text-xl font-semibold py-4 ">
              <motion.button
                initial={{ scale: 1, backgroundColor: "#ffff", color: "#000" }} // Stato iniziale
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#000",
                  color: "#fff",
                }} // Stato durante l'hover
                transition={{ duration: 0.3 }}
                className="w-[20%] rounded-full py-2 bg-secondary border-2 border-black"
              >
                SEND
              </motion.button>
            </div>
          </form>
        </div>
        <Ftr />
      </div>
    </>
  );
}

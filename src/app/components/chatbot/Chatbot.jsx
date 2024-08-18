"use client";
import Image from "next/image";
import chat from "../../../../public/icons/chat.png";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch("/api/aiopen", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ message }),
  //   });
  //   const data = await res.json();
  //   setResponse(data.result);
  // };
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="">
        <motion.button
          onClick={toggleOpen}
          initlal={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="fixed z-30 bottom-10 left-2 shadow-2xl sm:left-10 sm:w-[80px] sm:h-[80px] w-[70px] h-[70px] rounded-full backdrop-blur-md bg-tertiary/70 flex justify-center items-center"
        >
          <Image src={chat} alt="chat" width={35} className="sm:w-[40px]" />
        </motion.button>
        <motion.div
          initlal={{ x: "0%" }}
          animate={{ x: open ? "0%" : "-120%" }}
          className={`fixed shadow-2xl z-30 w-full sm:w-[400px] left-0 sm:left-10 h-[600px] sm:h-[400px] top-20 sm:top-48 rounded-2xl bg-white ${
            open ? "flex" : "hidden"
          } flex-col justify-end`}
        >
          {/* {response && <p>Risposta: {response}</p>} */}
          <form className="w-full h-[60px] bg-slate-300 rounded-2xl flex justify-between items-center gap-2 px-4">
            <input
              type="text"
              className="w-full px-2 py-1 rounded-2xl"
              placeholder="Write a message"
            />
            <button className="w-fit rounded-2xl py-1 px-4 h-fit bg-tertiary text-sm font-semibold">
              SEND
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

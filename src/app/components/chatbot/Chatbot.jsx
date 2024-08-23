"use client";
import Image from "next/image";
import chatImg from "../../../../public/icons/chat.png";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() !== "") {
      const userMessage = { sender: "user", text: message };
      setChat((prevChat) => [...prevChat, userMessage]);
      setMessage("");

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage.text }),
        });

        const data = await res.json();
        if (data.response) {
          const botMessage = { sender: "bot", text: data.response };
          setChat((prevChat) => [...prevChat, botMessage]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <>
      <div className="">
        <motion.button
          onClick={toggleOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="fixed z-30 bottom-10 left-2 shadow-2xl sm:left-10 sm:w-[80px] sm:h-[80px] w-[70px] h-[70px] rounded-full backdrop-blur-md bg-tertiary/70 flex justify-center items-center"
        >
          <Image src={chatImg} alt="chat" width={35} className="sm:w-[40px]" />
        </motion.button>

        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: open ? "0%" : "-120%" }}
          className={`fixed shadow-2xl z-30 w-full sm:w-[400px] left-0 sm:left-10 h-[600px] sm:h-[400px] top-20 sm:top-48 rounded-2xl bg-white ${
            open ? "flex" : "hidden"
          } flex-col justify-end`}
        >
          <div className="flex flex-col p-4 overflow-y-auto flex-grow">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-200 self-end"
                    : "bg-gray-200 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full h-[60px] bg-slate-300 rounded-2xl flex justify-between items-center gap-2 px-4"
          >
            <input
              type="text"
              className="w-full px-2 py-1 rounded-2xl"
              placeholder="Scrivi un messaggio"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="w-fit rounded-2xl py-1 px-4 h-fit bg-tertiary text-sm font-semibold"
            >
              INVIA
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

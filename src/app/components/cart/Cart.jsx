"use client";

import { useState, useEffect } from "react";
import { color, motion } from "framer-motion";
import { storefront } from "../../../../utilis";
import bin from "../../../../public/icons/bin.png";
import Image from "next/image";
import { createCart, loadCart } from "../../../../utilis/query";

export default function Cart({ isOpen, setIsOpen }) {
  const [cart, setCart] = useState({ id: null, lines: [] });

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        let data = JSON.parse(
          window.localStorage.getItem("retrovaconf:shopify:cart")
        );
        console.log("LocalStorage cart data:", data);

        if (data) {
          const existingCart = await storefront(loadCart, {
            cartId: data.data.cartCreate.cart.id,
          });
          console.log("Fetched cart from Shopify:", existingCart);

          setCart({
            id: data.data.cartCreate.cart.id,
            checkoutUrl: data.data.cartCreate.cart.checkoutUrl,
            estimatedCost:
              existingCart.data.cart.estimatedCost.totalAmount.amount,
            lines: existingCart.data.cart.lines.edges,
          });

          return;
        }

        data = await storefront(createCart);
        console.log("Newly created cart data:", data);

        setCart({
          id: data.id,
          checkoutUrl: data.checkoutUrl,
          estimatedCost: null,
          lines: [],
        });

        window.localStorage.setItem(
          "retrovaconf:shopify:cart",
          JSON.stringify(data)
        );
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCart();

    const interval = setInterval(() => {
      const state = window.localStorage.getItem("retrovaconf:shopify:status");
      if (state && state === "dirty") {
        fetchCart();
        window.localStorage.setItem("retrovaconf:shopify:status", "clean");
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const emptyCart = () => {
    console.log("Emptying cart");
    window.localStorage.removeItem("retrovaconf:shopify:cart");
    setCart({ id: null, lines: [] }); // Resetta lo stato del carrello
    console.log("Cart state after emptying:", cart);
  };
  console.log(cart);

  return (
    <motion.div
      className="fixed right-0 h-[99%] z-20 bottom-0 w-[80%] sm:w-[40%] bg-white rounded-xl shadow-2xl flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={toggleOpen}
        className="absolute top-3 right-3 font-extrabold text-xl"
      >
        X
      </button>
      <div className="py-4 flex justify-center items-center h-fit w-full text-sm font-bold border-b-2 border-black">
        <h3>SHOPPING CART</h3>
      </div>
      <div className="w-full pb-4 flex flex-col overflow-auto">
        {cart &&
          cart.lines.map((el, index) => {
            console.log(el.node.merchandise.id);
            return (
              <div
                key={index}
                className="w-full px-2 sm:px-10 py-8 flex items-center text-xs"
              >
                <div className="px-2 relative flex flex-col justify-center items-center">
                  <Image
                    src={el.node.merchandise.product.images.edges[0].node.url}
                    alt="productCart"
                    width={130}
                    height={100}
                  />
                  <div className="absolute rounded-full w-6 h-6 bottom-0 right-0 text-white font-semibold bg-black flex justify-center items-center">
                    <p>{el.node.quantity}</p>
                  </div>
                </div>

                <div className="w-full text-center sm:text-start flex justify-center items-center flex-col pr-2 text-xs">
                  {el.node.merchandise.product.title} - <br />
                  <span className="font-semibold">
                    {el.node.merchandise.title}
                  </span>
                </div>
                <div className="px-2 font-bold text-nowrap">
                  {el.node.estimatedCost.amount.amount}{" "}
                  {el.node.estimatedCost.amount.currencyCode}
                </div>
              </div>
            );
          })}
        {cart.lines.length === 0 ? (
          <div className="w-full h-fit text-center font-semibold px-10 text-xs">
            <h3>
              Your cart is empty. <br />
              Start adding some merchandise!
            </h3>
          </div>
        ) : (
          <>
            <div className="w-full h-fit text-end font-semibold px-10 flex gap-14 justify-center items-center sm:text-base text-xs">
              <motion.button
                initial={{ scale: 1, backgroundColor: "#ffff", color: "#000" }} // Stato iniziale
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#000",
                  color: "#fff",
                }} // Stato durante l'hover
                transition={{ duration: 0.3 }} // Durata dell'animazione
                className="w-[60%] rounded-2xl border-2 border-black py-1 sm:text-base text-xs sm:px-0 px-2"
              >
                CHECKOUT
              </motion.button>
              TOTAL {cart.estimatedCost}
            </div>
            <button
              className="flex justify-center items-center group absolute bottom-5 right-4"
              onClick={emptyCart}
            >
              <Image src={bin} alt="bin" width={25} height={25} />
              <p className="text-center justify-center items-center group-hover:flex hidden absolute -top-6 w-[60px] mr-[14px] bg-white h-[20px] border-2 rounded-2xl right-0 translate-x-1/2 text-xs font-semibold">
                CLEAR
              </p>
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

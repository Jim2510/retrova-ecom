"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
        console.log(data);
        if (data) {
          const existingCart = await storefront(loadCart, {
            cartId: data.data.cartCreate.cart.id,
          });
          console.log(existingCart);

          setCart({
            id: data.data.cartCreate.cart.id,
            checkoutUrl: data.data.cartCreate.cart.checkoutUrl,
            estimatedCost:
              existingCart.data.cart.estimatedCost.totalAmount.amount,
            lines: existingCart.data.cart.lines.edges,
          });

          console.log(cart);

          return;
        }

        data = await storefront(createCart);
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
        console.log(cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCart();
  }, []);

  const emptyCart = () => {
    window.localStorage.removeItem("retrovaconf:shopify:cart");
  };
  console.log(cart.lines);

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
      <div className="w-full h-[150px] pb-4 flex flex-col overflow-auto">
        {cart &&
          cart.lines.map((el, index) => {
            return (
              <div key={index} className="w-full px-10 py-10 flex items-center">
                <div className="flex">
                  <button className=" px-2 border-2 border-black rounded-l-2xl font-semibold">
                    -
                  </button>
                  <p className="font-semibold text-black px-2 border-2 border-black">
                    {el.node.quantity}
                  </p>
                  <button className=" px-2 border-2 border-black rounded-r-2xl font-semibold">
                    +
                  </button>
                </div>
                <div className="w-full text-center px-2">
                  {el.node.merchandise.product.title} -{" "}
                  {el.node.merchandise.title}
                </div>
                <button className="" onClick={emptyCart}>
                  <Image src={bin} alt="bin" width={25} height={25} />
                </button>
              </div>
            );
          })}
      </div>
      <div className="w-full p-4">
        {/* {checkoutUrl && (
          <a
            href={checkoutUrl}
            className="bg-black text-white w-full py-2 px-4 text-center rounded-lg block"
          >
            Proceed to Checkout
          </a>
        )} */}
      </div>
    </motion.div>
  );
}

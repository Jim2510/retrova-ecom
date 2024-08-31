"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NavSocial from "../../components/reusables/NavSocial";
import Navbar from "../../components/reusables/Navbar";
import Ftr from "../../components/reusables/Ftr";
import Image from "next/image";
import star from "../../../../public/icons/starr.png";
import Link from "next/link";
import Cart from "../../components/cart/Cart";
import { storefront } from "../../../../utilis";
import { productsQuery } from "../../api/getProducts";
import left from "../../../../public/icons/left-arrow.png";
import right from "../../../../public/icons/right-arrow.png";
import { addToCartMutation } from "../../../../utilis/query";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { login } from "../../../../store/authSlice";
import Cookies from "js-cookie";

export default function ProductDetails() {
  const { productId } = useParams();
  const [prods, setProds] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [image, setImage] = useState(0);
  const [id, setId] = useState(null);
  const [startX, setStartX] = useState(0);
  const [direction, setDirection] = useState(0); // Per l'animazione di transizione

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const decodedProdId = decodeURIComponent(productId);
        console.log("Decoded Product ID:", decodedProdId);

        const data = await storefront(productsQuery);

        const product = data.data.products.edges.find(
          (item) => item.node.id === decodedProdId
        );

        console.log("Found Product:", product);
        if (product) {
          setProds(product);
          if (product.node.variants.edges.length > 0) {
            setId(product.node.variants.edges[0].node.id);
          }
          console.log("Updated State:", prods);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

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

  const changeImage = (index) => {
    setDirection(index > image ? 1 : -1); // Imposta la direzione dell'animazione
    setImage(index);
  };

  const nextImg = () => {
    if (prods && image < prods.node.images.edges.length - 1) {
      setDirection(1); // Direzione verso destra
      setImage(image + 1);
    }
  };

  const prevImg = () => {
    if (image > 0) {
      setDirection(-1); // Direzione verso sinistra
      setImage(image - 1);
    }
  };

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setId(selectedId);
    console.log("Selected ID:", event.target.value);
  };

  const addProduct = async () => {
    setIsOpen(true);

    let localCartData = JSON.parse(
      window.localStorage.getItem("retrovaconf:shopify:cart")
    );
    console.log("Local Cart Data:", localCartData);

    if (!localCartData) {
      console.error("Cart data not found in local storage.");
      return;
    }

    try {
      const result = await storefront(addToCartMutation, {
        cartId: localCartData.data.cartCreate.cart.id,
        variantId: id,
      });

      console.log("Add to Cart Result:", result);

      if (
        result.data &&
        result.data.cartLinesAdd &&
        result.data.cartLinesAdd.cart
      ) {
        console.log("Product added to cart:", result.data.cartLinesAdd.cart);
      } else {
        console.error("Unexpected response structure:", result);
      }
      window.localStorage.setItem("retrovaconf:shopify:status", "dirty");
      return result;
    } catch (error) {
      console.error("Error during addProduct:", error);
    }
  };

  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (diffX > 50) {
      nextImg(); // Swipe sinistro
    } else if (diffX < -50) {
      prevImg(); // Swipe destro
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50, // Spostamento minimo per creare un effetto di swipe
      opacity: 0,
      position: "absolute", // Mantenere le immagini sovrapposte
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      position: "relative", // L'immagine visibile è in posizione relativa
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50, // Spostamento minimo per creare un effetto di swipe
      opacity: 0,
      position: "absolute", // L'immagine che esce diventa di nuovo assoluta
    }),
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <NavSocial scrollY={scrollY} />
      <Navbar toggleOpen={toggleOpen} scrollY={scrollY} />
      <div className="w-full min-h-[500px] grid sm:grid-cols-2 grid-cols-1 mt-[120px] pb-20">
        <div className="w-full h-full pl-2 sm:pr-14 pr-2">
          <motion.div
            className="relative w-full flex mb-2 h-[300px] sm:h-[500px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={image}
                src={prods ? prods.node.images.edges[image].node.url : ""}
                className="mb-2 w-full object-contain relative top-0 h-full"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 20 }, // Riduci il damping a 20 per meno rimbalzo
                  opacity: { duration: 0.3 }, // Leggero aumento nella durata dell'opacità
                }}
                alt="product"
              />
            </AnimatePresence>
            <Image
              src={left}
              className="absolute top-[50%] left-5 cursor-pointer hidden sm:block" // Nasconde le frecce sui dispositivi mobili
              onClick={prevImg}
              width={20}
              height={20}
              alt="previous"
            />
            <Image
              src={right}
              className="absolute top-[50%] right-5 cursor-pointer hidden sm:block" // Nasconde le frecce sui dispositivi mobili
              onClick={nextImg}
              width={20}
              height={20}
              alt="next"
            />
          </motion.div>
          <div className="grid-cols-5 grid gap-2">
            {prods &&
              prods.node.images.edges.map((image, index) => (
                <button
                  key={index}
                  className="h-fit sm:h-[130px] overflow-hidden"
                  onClick={() => changeImage(index)}
                >
                  <Image
                    width={250}
                    height={350}
                    src={image.node.url}
                    className="object-cover w-full"
                    alt="product thumbnail"
                  />
                </button>
              ))}
          </div>
        </div>
        <div className="w-full h-full flex flex-col sm:mt-0 mt-10 sm:px-0 px-5">
          {prods ? (
            <>
              <div className="flex flex-col pb-6">
                <h2 className="text-2xl font-semibold">{prods.node.title}</h2>
                <h2 className="text-2xl font-extrabold">
                  € {prods.node.priceRange.minVariantPrice.amount} EUR
                </h2>
              </div>
              <div className="pb-6">
                <p className="pb-4">Color</p>
                <select
                  className="border p-2"
                  onChange={handleSelectChange}
                  value={id}
                >
                  {prods.node.variants.edges.map((variant) => (
                    <option key={variant.node.id} value={variant.node.id}>
                      {variant.node.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full px-8 pb-6">
                <motion.button
                  initial={{
                    scale: 1,
                    backgroundColor: "#ffff",
                    color: "#000",
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#000",
                    color: "#fff",
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={addProduct}
                  className="w-full text-sm sm:px-0 px-6 sm:text-2xl bg-white py-2 rounded-2xl font-semibold border-2 border-black"
                >
                  ADD TO CART
                </motion.button>
              </div>
              <div className="w-full flex justify-center items-center pb-6">
                <Link
                  className="border-b-2 border-black font-semibold text-sm"
                  href={"/info/payment"}
                >
                  Payment Option
                </Link>
              </div>
              <div className="text-sm pb-6">
                {prods.node.description
                  .split(/\s(?=\w+:)/)
                  .map((section, index) => (
                    <p key={index}>{section.trim()}</p>
                  ))}
              </div>
              <div className="flex flex-col text-sm pb-6">
                <h3 className="pb-6 text-xs font-extrabold">DETAILS</h3>
                <ul className="flex flex-col gap-2 list-disc list-inside">
                  {/* List details */}
                </ul>
              </div>
              <div className="flex gap-8 text-sm items-end font-semibold">
                <div className="flex items-center">
                  <Image
                    src={star}
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="star"
                  />
                  <p>4.8</p>
                </div>
                <div>25 Reviews</div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Ftr />
      <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

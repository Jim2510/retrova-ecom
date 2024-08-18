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

export default function ProductDetails() {
  const { productId } = useParams();
  const [prods, setProds] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [image, setImage] = useState(0);
  const [id, setId] = useState(null);

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
            setId(product.node.variants.edges[0].node.id); // Imposta l'ID del primo variante come valore predefinito
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
    setImage(parseInt(index));
  };

  const nextImg = () => {
    if (image < 9) {
      setImage(image + 1);
    } else {
      setImage(0);
    }
  };

  const prevImg = () => {
    if (image > 0) {
      setImage(image - 1);
    } else {
      setImage(0);
    }
  };

  const handleSelectChange = (event) => {
    setId(event.target.value.stringify()); // Aggiorna lo stato `id` con il valore selezionato
    console.log("Selected ID:", event.target.value.stringify()); // Mostra l'ID selezionato
  };

  const addProduct = async () => {
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

      // Verifica se la mutazione ha aggiunto correttamente il prodotto
      if (
        result.data &&
        result.data.cartLinesAdd &&
        result.data.cartLinesAdd.cart
      ) {
        console.log("Product added to cart:", result.data.cartLinesAdd.cart);
        // A questo punto puoi aggiornare lo stato del carrello o fare altre operazioni
      } else {
        console.error("Unexpected response structure:", result);
      }

      return result;
    } catch (error) {
      console.error("Error during addProduct:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <NavSocial scrollY={scrollY} />
      <Navbar toggleOpen={toggleOpen} scrollY={scrollY} />
      <div className="w-full min-h-[500px] grid sm:grid-cols-2 grid-cols-1 mt-[120px] pb-20 ">
        <div className="w-full h-full pl-2 sm:pr-14 pr-2">
          <div className="relative w-full flex mb-2 h-[300px] sm:h-[500px] overflow-hidden">
            <Image
              src={prods ? prods.node.images.edges[image].node.url : ""}
              width={500}
              height={350}
              className="mb-2 w-full object-cover relative top-0 h-full"
              alt="product"
            />
            <Image
              src={left}
              className="absolute top-[50%] left-5 cursor-pointer"
              onClick={prevImg}
              width={20}
              height={20}
            />
            <Image
              src={right}
              className="absolute top-[50%] right-5 cursor-pointer"
              onClick={nextImg}
              width={20}
              height={20}
            />
          </div>
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
                    alt="product"
                  />
                </button>
              ))}
          </div>
        </div>

        <div className="w-full h-full flex flex-col sm:mt-0 mt-10 sm:px-0 px-20">
          {prods ? (
            <>
              <div className="flex flex-col pb-6">
                <h2 className="text-2xl font-semibold">{prods.node.title}</h2>
                <h2 className="text-2xl font-extrabold">
                  € {prods.node.priceRange.minVariantPrice.amount} EUR
                </h2>
              </div>
              <div className="pb-6">
                <p className="text-lg">
                  <Link
                    href={"/shipping"}
                    className="underline underline-offset-2"
                  >
                    SHIPPING & DUTIES
                  </Link>{" "}
                  CALCULATED AT CHECKOUT
                </p>
              </div>
              <div className="flex flex-col w-full">
                {/* Size buttons here */}
              </div>
              <div className="flex flex-col pb-10">
                <h3 className="text-emerald-400 text-lg font-bold tracking-wider pb-6">
                  AVAILABLE
                </h3>
                <h3>STANDARD INTERNATIONAL SHIPPING (1-4 WEEKS)</h3>
              </div>
              <div className="w-full pb-8">
                <select
                  onChange={handleSelectChange}
                  name="variant"
                  id=""
                  className="font-extrabold focus:outline-none border-2 border-[#ECEBE4] p-2"
                  value={id} // Imposta il valore della select
                >
                  {prods.node.variants.edges.map((variant) => (
                    <option key={variant.node.id} value={variant.node.id}>
                      {variant.node.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full px-8 pb-6">
                <button
                  onClick={addProduct}
                  className="w-full text-sm sm:px-0 px-6 sm:text-2xl bg-tertiary py-2 rounded-2xl font-semibold hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] hover:drop-shadow-none transition-all ease-in-out drop-shadow-lg"
                >
                  ADD TO CART
                </button>
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

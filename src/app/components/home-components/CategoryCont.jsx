"use client";

import { motion } from "framer-motion";
import CardHome from "./CardHome";
import { useEffect, useState } from "react";
import { storefront } from "../../../../utilis";
import { productsQuery } from "../../api/getProducts";

export default function CategoryCont() {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefront(productsQuery);
        setProds(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <div className="w-full px-1">
        <motion.div className="grid grid-cols-2 sm:grid-cols-4 sm:gap-10 sm:px-8">
          {prods.data?.products?.edges?.length > 0 && (
            <CardHome
              index={prods.data.products.edges[0].node.id}
              img={prods.data.products.edges[0].node.images.edges[0].node.url}
              nomeP={prods.data.products.edges[0].node.title}
              imgHover={
                prods.data.products.edges[0].node.images.edges[1].node.url
              }
              prezzo={
                prods.data.products.edges[0].node.priceRange.minVariantPrice
                  .amount
              }
            />
          )}
          {prods.data?.products?.edges?.length > 0 && (
            <CardHome
              index={prods.data.products.edges[1].node.id}
              img={prods.data.products.edges[1].node.images.edges[0].node.url}
              nomeP={prods.data.products.edges[1].node.title}
              imgHover={
                prods.data.products.edges[1].node.images.edges[1].node.url
              }
              prezzo={
                prods.data.products.edges[1].node.priceRange.minVariantPrice
                  .amount
              }
            />
          )}
          {prods.data?.products?.edges?.length > 0 && (
            <CardHome
              index={prods.data.products.edges[2].node.id}
              img={prods.data.products.edges[2].node.images.edges[0].node.url}
              nomeP={prods.data.products.edges[2].node.title}
              imgHover={
                prods.data.products.edges[2].node.images.edges[1].node.url
              }
              prezzo={
                prods.data.products.edges[2].node.priceRange.minVariantPrice
                  .amount
              }
            />
          )}
          {prods.data?.products?.edges?.length > 0 && (
            <CardHome
              index={prods.data.products.edges[3].node.id}
              img={prods.data.products.edges[3].node.images.edges[0].node.url}
              nomeP={prods.data.products.edges[3].node.title}
              imgHover={
                prods.data.products.edges[3].node.images.edges[1].node.url
              }
              prezzo={
                prods.data.products.edges[3].node.priceRange.minVariantPrice
                  .amount
              }
            />
          )}
        </motion.div>
      </div>
    </>
  );
}

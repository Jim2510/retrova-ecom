"use client";

import { motion } from "framer-motion";
import CardHome from "./CardHome";
import { useEffect, useState } from "react";
import { storefront } from "../../../../utilis";
import { productsQuery } from "../../api/getProducts";
import ScaleLoader from "react-spinners/ScaleLoader"; // Importa il loader

export default function CategoryCont() {
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(false); // Stato per il caricamento

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Imposta loading a true prima di iniziare il caricamento
        const data = await storefront(productsQuery);
        setProds(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Imposta loading a false dopo il caricamento
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full border-y-2 border-black">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ScaleLoader
              color={"#000000"}
              loading={loading}
              height={35} // Altezza delle barre
              width={4} // Larghezza delle barre
              margin={4} // Margine tra le barre
              radius={2} // Raggio degli angoli delle barre
            />
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-4">
            {prods.data?.products?.edges?.length > 0 && (
              <>
                <CardHome
                  index={prods.data.products.edges[0].node.id}
                  img={
                    prods.data.products.edges[0].node.images.edges[1].node.url
                  }
                  nomeP={prods.data.products.edges[0].node.title}
                  imgHover={
                    prods.data.products.edges[0].node.images.edges[0].node.url
                  }
                  prezzo={
                    prods.data.products.edges[0].node.priceRange.minVariantPrice
                      .amount
                  }
                />
                <CardHome
                  index={prods.data.products.edges[1].node.id}
                  img={
                    prods.data.products.edges[1].node.images.edges[1].node.url
                  }
                  nomeP={prods.data.products.edges[1].node.title}
                  imgHover={
                    prods.data.products.edges[1].node.images.edges[0].node.url
                  }
                  prezzo={
                    prods.data.products.edges[1].node.priceRange.minVariantPrice
                      .amount
                  }
                />
                <CardHome
                  index={prods.data.products.edges[2].node.id}
                  img={
                    prods.data.products.edges[2].node.images.edges[1].node.url
                  }
                  nomeP={prods.data.products.edges[2].node.title}
                  imgHover={
                    prods.data.products.edges[2].node.images.edges[0].node.url
                  }
                  prezzo={
                    prods.data.products.edges[2].node.priceRange.minVariantPrice
                      .amount
                  }
                />
                <CardHome
                  index={prods.data.products.edges[3].node.id}
                  img={
                    prods.data.products.edges[3].node.images.edges[1].node.url
                  }
                  nomeP={prods.data.products.edges[3].node.title}
                  imgHover={
                    prods.data.products.edges[3].node.images.edges[0].node.url
                  }
                  prezzo={
                    prods.data.products.edges[3].node.priceRange.minVariantPrice
                      .amount
                  }
                />
              </>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/reusables/Navbar";
import NavSocial from "../components/reusables/NavSocial";
import InfiniteScroll from "react-infinite-scroll-component";
import products from "../data/prods"; // Ensure this contains initial data
import CardHome from "../components/home-components/CardHome";
import Cart from "../components/cart/Cart";
import Ftr from "../components/reusables/Ftr";

import { storefront } from "../../../utilis";
import { productsQuery } from "../../app/api/getProducts";
import PropagateLoader from "react-spinners/PropagateLoader";

// Simulate fetching more data
const fetchMoreData = (currentItems) => {
  const newItems = products.slice(currentItems.length, currentItems.length + 8);
  return newItems;
};

export default function Prods() {
  const [items, setItems] = useState(products.slice(0, 8));
  const [hasMore, setHasMore] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [prods, setProds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true); // Imposta isLoading su true prima del fetch
        const data = await storefront(productsQuery);
        setProds(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // Imposta isLoading su false dopo il fetch, anche in caso di errore
      }
    };

    fetchProducts();
  }, []);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = useCallback(() => {
    setTimeout(() => {
      const newItems = fetchMoreData(items);
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prevItems) => [...prevItems, ...newItems]);
      }
    }, 1000);
  }, [items]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Funzione per filtrare i prodotti
  const filterProducts = (products) => {
    return products.filter((product) => {
      if (selectedCategory === "All") return true;
      return product.node.productType === selectedCategory;
    });
  };

  // Funzione per ordinare i prodotti
  const sortProducts = (products) => {
    return products.sort((a, b) => {
      const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });
  };

  // Prodotti filtrati e ordinati
  const filteredAndSortedProds = sortProducts(
    filterProducts(prods.data?.products?.edges || [])
  );

  return (
    <>
      <div className="w-full flex flex-col gap-2 min-h-screen">
        <NavSocial scrollY={scrollY} />
        <Navbar toggleOpen={toggleOpen} scrollY={scrollY} bgNav={"bg-white"} />
        <Cart isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Menu Filtri e Ordinamento */}
        <motion.div
          className="flex md:flex-row justify-between w-full items-center py-4 px-1 fixed z-[11]"
          style={{
            top: scrollY > 50 ? "50px" : "128px", // Cambia l'altezza in base allo scroll
          }}
          initial={{ top: "128px" }}
          animate={{ top: scrollY > 50 ? "50px" : "128px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-fit md:w-fit flex justify-start items-center bg-white rounded-full md:mb-0">
            <label className="mr-2 font-semibold p-2 rounded-full sm:text-base text-[0.5rem]">
              Filter by Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 text-xs md:text-sm border border-gray-300 rounded-r-full"
            >
              <option value="All">All</option>
              <option value="Category1">Category 1</option>
              <option value="Category2">Category 2</option>
              <option value="Category3">Category 3</option>
              {/* Aggiungi qui altre categorie in base ai tuoi dati */}
            </select>
          </div>
          <div className="w-fit md:w-fit flex justify-end items-center bg-white rounded-full">
            <label className="mr-2 font-semibold p-2 sm:text-base text-[0.5rem]">
              Sort by Price:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 text-xs md:text-sm border border-gray-300 rounded-r-full"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden min-h-screen mt-32">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center h-64"
                >
                  <PropagateLoader
                    color={"#000000"}
                    loading={true}
                    height={35}
                    width={4}
                    margin={4}
                    radius={2}
                  />
                </div>
              ))
            : filteredAndSortedProds.length > 0 &&
              filteredAndSortedProds.map((item, index) => (
                <CardHome
                  index={item.node.id}
                  key={index}
                  nomeP={item.node.title}
                  img={item.node.images.edges[1].node.url}
                  imgHover={item.node.images.edges[0].node.url}
                  info={item.node.productType}
                  prezzo={item.node.priceRange.minVariantPrice.amount}
                  desc={item.node.productType}
                />
              ))}
        </div>

        <Ftr />
      </div>
    </>
  );
}

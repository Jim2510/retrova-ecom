"use client";

import { useState, useCallback, useEffect } from "react";
import Navbar from "../components/reusables/Navbar";
import NavSocial from "../components/reusables/NavSocial";
import InfiniteScroll from "react-infinite-scroll-component";
import products from "../data/prods"; // Ensure this contains initial data
import CardHome from "../components/home-components/CardHome";
import Cart from "../components/cart/Cart";
import Ftr from "../components/reusables/Ftr";

import { storefront } from "../../../utilis";
import { productsQuery } from "../../app/api/getProducts";

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
      <div className="w-full flex flex-col gap-2">
        <NavSocial scrollY={scrollY} />
        <Navbar toggleOpen={toggleOpen} scrollY={scrollY} bgNav={"bg-white"} />
        <Cart isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Menu Filtri e Ordinamento */}
        <div className="flex justify-between items-center p-4 mt-32">
          <div>
            <label className="mr-2 font-semibold">Filter by Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="All">All</option>
              <option value="Category1">Category 1</option>
              <option value="Category2">Category 2</option>
              <option value="Category3">Category 3</option>
              {/* Aggiungi qui altre categorie in base ai tuoi dati */}
            </select>
          </div>
          <div>
            <label className="mr-2 font-semibold">Sort by Price:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          endMessage={
            <p style={{ textAlign: "center" }} className=" pt-10 text-2xl">
              <b>YOU HAVE SEEN IT ALL</b>
            </p>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
            {filteredAndSortedProds.length > 0 &&
              filteredAndSortedProds.map((item, index) => (
                <CardHome
                  index={item.node.id}
                  key={index}
                  nomeP={item.node.title}
                  img={item.node.images.edges[0].node.url}
                  imgHover={item.node.images.edges[1].node.url}
                  info={item.node.productType}
                  prezzo={item.node.priceRange.minVariantPrice.amount}
                  desc={item.node.productType}
                />
              ))}
          </div>
        </InfiniteScroll>
        <Ftr />
      </div>
    </>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { storefront } from "../../../../utilis";
import { collectionsQuery, productsQuery } from "../../api/getProducts";
import NavSocial from "../../components/reusables/NavSocial";
import Navbar from "../../components/reusables/Navbar";
import CardHome from "../../components/home-components/CardHome";
import Ftr from "../../components/reusables/Ftr";
import products from "../../data/prods";
import NavSort from "../../components/reusables/NavSort";
import Cart from "../../components/cart/Cart";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefront(collectionsQuery);
        const necklaces = data.data.collections.edges[0].node.products.edges;
        console.log(data);
        console.log(necklaces);
        setProds(necklaces);
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

  return (
    <>
      <div className="w-full flex flex-col gap-20">
        <NavSocial scrollY={scrollY} />
        <Navbar toggleOpen={toggleOpen} scrollY={scrollY} />
        <NavSort scrollY={scrollY} />
        <Cart isOpen={isOpen} toggleOpen={toggleOpen} />
        <InfiniteScroll
          className="mt-[200px] w-full h-full"
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
            {prods &&
              prods.map((item, index) => (
                <CardHome
                  index={item.node.id}
                  key={index}
                  nomeP={item.node.title}
                  img={item.node.images.edges[0].node.url}
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

"use client";

import { useState, useCallback, useEffect } from "react";
import Navbar from "../components/reusables/Navbar";
import NavSocial from "../components/reusables/NavSocial";
import InfiniteScroll from "react-infinite-scroll-component";
import products from "../data/prods"; // Ensure this contains initial data
import CardHome from "../components/home-components/CardHome";
import Cart from "../components/cart/Cart";
import Ftr from "../components/reusables/Ftr";

// Simulate fetching more data
const fetchMoreData = (currentItems) => {
  const newItems = products.slice(
    currentItems.length,
    currentItems.length + 10
  );
  return newItems;
};

export default function Offers() {
  const [items, setItems] = useState(products.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
        <Cart isOpen={isOpen} toggleOpen={toggleOpen} />
        <InfiniteScroll
          className="mt-[200px]"
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <h4 className="text-center pt-10 text-2xl font-extrabold">
              LOADING...
            </h4>
          }
          endMessage={
            <p style={{ textAlign: "center" }} className=" pt-10 text-2xl">
              <b>YOU HAVE SEEN IT ALL</b>
            </p>
          }
          pullDownToRefresh
          refreshFunction={() => {
            console.log("Refreshed!");
            setItems(products.slice(0, 10));
            setHasMore(true);
          }}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <CardHome
                key={index}
                nomeP={item.nomeP}
                img={item.img}
                info={item.info}
                prezzo={item.prezzo}
                desc={item.desc}
              />
            ))}
          </div>
        </InfiniteScroll>
        <Ftr />
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/reusables/Navbar";
import NavSocial from "../components/reusables/NavSocial";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Ftr from "../components/reusables/Ftr";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const accessToken = Cookies.get("accessToken");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
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
    console.log(accessToken);
    const getOrders = async () => {
      const response = await fetch("/api/customer/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerAccessToken: accessToken, // Corrected key
        }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setOrders(result.data.data.customer.orders.edges);
      } else {
        console.error("Error fetching orders:", result.error);
        return null;
      }
    };

    getOrders();
  }, [accessToken]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    // Rimuove il token di accesso e i dati dell'utente dai cookie
    Cookies.remove("accessToken");
    Cookies.remove("user");

    // Effettua il logout nello store Redux
    dispatch(logout());

    // Reindirizza l'utente alla pagina di login
    router.push("/login");
  };

  console.log(orders);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavSocial />
        <Navbar toggleOpen={toggleOpen} />
        <div className="w-[80%] text-center sm:w-[50%] mt-[150px] flex flex-col items-center mx-auto min-h-[380px]">
          <h1 className="font-bold tracking-[1rem] text-6xl"></h1>
          <div className="mt-[140px] w-[80%] rounded-lg shadow-xl flex flex-col items-center py-4">
            <h2 className="font-bold tracking-widest text-xs sm:text-xl">
              {user.email.toUpperCase()}
            </h2>
            {orders.length === 0 ? (
              orders.map((order) => (
                <div key={order.node.id}>
                  <h2>{order.node.name}</h2>
                  <p>Processed at: {order.node.processedAt}</p>
                  <p>Status: {order.node.fulfillmentStatus}</p>
                  <p>
                    Total Price: {order.node.totalPriceSet.shopMoney.amount}{" "}
                    {order.node.totalPriceSet.shopMoney.currencyCode}
                  </p>
                  <h3>Items:</h3>
                  <ul>
                    {order.node.lineItems.edges.map((item) => (
                      <li key={item.node.title}>
                        {item.node.title} - {item.node.quantity} x{" "}
                        {item.node.originalTotalPrice.amount}{" "}
                        {item.node.originalTotalPrice.currencyCode}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="w-full py-4">
                <p className="font-semibold text-xl ">No orders found.</p>
              </div>
            )}
            <button
              onClick={handleLogOut}
              className="px-2 font-semibold tracking-wide py-1 border-2 border-black rounded-lg mt-4"
            >
              LOGOUT
            </button>
          </div>
        </div>
        <Ftr />
      </div>
    </>
  );
}

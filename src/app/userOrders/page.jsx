"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/reusables/Navbar";
import NavSocial from "../components/reusables/NavSocial";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const accessToken = Cookies.get("accessToken");
  const dispatch = useDispatch();

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
        setOrders(result.orders);
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

  console.log(orders);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavSocial />
        <Navbar toggleOpen={toggleOpen} />
        <div className="w-[50%] mt-[150px] flex flex-col items-center mx-auto">
          <h1 className="font-bold tracking-[1rem] text-6xl">Your Orders</h1>
          <div className="mt-[140px] w-[80%] rounded-lg shadow-xl flex flex-col items-center py-4">
            {orders.length > 0 ? (
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
              <p className="font-semibold text-xl ">No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/reusables/Navbar";
import NavSocial from "../../components/reusables/NavSocial";
import Ftr from "../../components/reusables/Ftr";
import { Montserrat } from "next/font/google";

const plex = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  fontDisplay: "swap",
  subsets: ["latin"],
});

export default function Faqs() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

  return (
    <>
      <div className={`min-h-screen flex flex-col relative ${plex.className}`}>
        <NavSocial scrollY={scrollY} />
        <Navbar toggleOpen={toggleOpen} scrollY={scrollY} />
        <div className="mt-32 px-20 w-full flex flex-col pt-10 pb-32 gap-6 text-xl">
          <h1 className="text-6xl font-bold">FAQs</h1>
          <h3 className="mt-10 text-xl">SHIPPING AND DELIVERY</h3>
          <h2 className="text-xl font-bold">
            WHERE IS MY ORDER/WHEN WILL I RECEIVE MY ITEMS?
          </h2>
          <p>
            Please note orders including items from both in-stock and pre-order
            will ship separately. Keep your eyes peeled for two tracking
            numbers!
          </p>
          <p>
            Once your order has been placed, the order will be processed within
            24-48 hours. Once your order is prepared for shipment and leaves our
            warehouse, the shipping time begins.
          </p>
          <p>
            Orders placed before 12pm will ship within 24 hours. Orders placed
            after 12pm will ship within 24-48 hours.
          </p>
          <p>
            To keep you informed about your order, we aim to provide you with a
            tracking number within 48 hours after your order has been prepared
            for shipping. This tracking number will enable you to monitor the
            progress of your package. Should you have any inquiries or require
            assistance during this process, please don't hesitate to reach out
            to our support team.
          </p>
          <p>
            Please be sure to check the product description for estimated start
            ship dates.
          </p>
          <p>
            Once shipped, US shipments (depending on shipping method) will take
            2-9 business days and international shipments will take 4-20
            business days to be delivered.
          </p>
          <p>
            Orders being shipped to South America, Middle East and Asia may take
            1-3 months to be delivered once shipped.
          </p>
          <h2 className="text-xl font-bold mt-20">
            WHAT IS A PRE-ORDER/BACKORDERED PRODUCT?
          </h2>
          <p>
            A pre-order is designed to reduce inventory waste and to manufacture
            to demand, in addition to that pre-orders may also be offered when
            products are in transit to our warehouses so we can prepare orders
            as soon as they arrive and ship them to you.
          </p>
          <p>
            A backorder is a product that has been reordered to be manufactured
            after the existing stock has sold out.
          </p>
          <h2 className="text-xl font-bold mt-20">
            DO YOU SHIP INTERNATIONALLY?
          </h2>
          <p>
            We ship to most countries around the world with the exception of
            limited countries based on international agreements and freight
            forwarder restrictions. If we are unable to ship to your country,
            you will be notified at checkout and your purchase will be blocked.
            Please contact our support team with any further questions on this
            at thesicilianmarket@gmail.com
          </p>
          <h2 className="text-xl font-bold mt-20">
            HOW MUCH DOES SHIPPING COST?
          </h2>
          <p>
            Shipping costs are displayed on the checkout page and are calculated
            based on the freight forwarder’s rates and depending on weight,
            shipping method and destination.
          </p>
          <h2 className="text-xl font-bold mt-20">
            WILL I HAVE TO PAY TAXES/IMPORT DUTIES IN MY COUNTRY?
          </h2>
          <p>
            Depending on the service requested at checkout Retrova now offers
            DDP shipping which means your price now includes duties, taxes and
            freight. Be sure to select this service for a faster and more
            convenient purchasing experience.
          </p>
          <p>
            Import duties are taxes collected on imports and some exports by a
            country's customs authorities. A good's value will usually dictate
            the import duty.
          </p>
          <p>
            While the cost of shipment for your package is included in your
            order total, you may be subject to taxes/import duties for your
            package upon arrival to your destination country.{" "}
          </p>
          <p>
            We do everything on our end to declare customs (value, items,
            weight, material) to ensure that there is no added customs charge
            when your order arrives to your country. Most of our packages ship
            without any additional fees or charges, but each country has a
            unique customs process and occasionally random packages will be
            pulled for inspection. We cannot control if your order gets pulled
            and there are additional fees during the customs process in your
            country. We do our due diligence on our end to prevent this from
            happening, but unfortunately we are not in control of each order and
            it is up to your country's postal service how your order is handled.
            We recommend speaking with your local post office if you have any
            specific questions regarding your country's customs process.
          </p>
          <p>
            Unpaid duty and tax orders will be considered abandoned and not
            liable for a refund.
          </p>
          <h2 className="text-xl font-bold mt-20">
            CAN I UPDATE MY SHIPPING ADDRESS AFTER I HAVE ORDERED?
          </h2>
          <p>
            If you have incorrectly formatted or entered your address, please
            contact customer support on thesicilianmarket@gmail.com immediately
            with your order number and correct shipping address. If you fail to
            communicate a shipping address change before your order is shipped
            you will have to contact the courier to reroute your order. Retrova
            is not responsible for shipment to an incorrect address if we are
            not provided the information prior to dispatch.
          </p>
          <p>
            If your package fails to be delivered due to an insufficient
            delivery address the goods will be returned to us. Please contact us
            if this occurs and we will organize a reshipment to an updated
            shipping address at an additional shipping cost.
          </p>
          <h2 className="text-xl font-bold">HOW DO I TRACK MY ORDER?</h2>
          <p>
            {" "}
            Tracking information will be sent to the contact information you
            provide us. This will be sent via email/sms when your order has been
            fulfilled. For specific tracking details or if your delivery is
            late, you can contact the carrier directly for the most up-to-date
            information, including any carrier or regional delays. Alternatively
            feel free to contact us on thesicilianmarket@gmail.com
          </p>
          <h3 className="text-xl mt-20">EXCHANGES AND RETURNS</h3>
          <h2 className="text-xl font-bold">
            CAN I EXCHANGE ITEMS ONCE I’VE PLACED MY ORDER?
          </h2>
          <p>
            Retrova now offers exchanges through our return portal providing
            goods are returned in their original packaging and are unworn.
          </p>
          <p>
            Return shipping costs are not included and an additional cost that
            you will need to pay, please consider the environment when
            purchasing and returning products as they carry a large carbon
            footprint.
          </p>
          <h2 className="text-xl font-bold mt-20">
            DOES RETROVA SHOP ACCEPT RETURNS?
          </h2>
          <p>
            Returns are accepted through our return portal providing goods are
            returned in their original packaging and are unworn.
          </p>
          <p>You may select a refund or exchange.</p>
          <p>
            Shipping costs are not refunded unless the goods are damaged or
            faulty.
          </p>
          <p>
            For any further questions please contact us at
            thesicilianmarket@gmail.com
          </p>
          <p>We have a 14 day return policy.</p>
          <p>
            <span className="text-2xl font-semibold">NOTE:</span>Customers are
            responsible for shipping costs for returns or exchanges unless it is
            wrong or damaged
          </p>
          <h3 className="text-xl mt-20">PAYMENT</h3>
          <h2 className="text-xl font-bold">
            WHAT PAYMENT METHODS ARE ACCEPTED?
          </h2>
          <p>
            We accept all major credit cards including Visa, Mastercard,
            American Express, and Discover. We also accept PayPal and prepaid
            gift cards from all major banks.
          </p>
          <p>
            You may also select alternative payment options such as Klarna and
            Shop Pay,
          </p>
          <p>At this time, we do not accept any form of cryptocurrency.</p>
          <h2 className="text-xl font-bold">IS MY PAYMENT SECURE?</h2>
          <p>
            Yes, your payment is secure. Our website uses the most up-to-date
            SSL encryption security techniques. The payment provider we work
            with, Stripe, is Level 1 PCI certified (the highest level
            attainable) and uses the most up-to-date SSL encryption to ensure
            all payments are secure.
          </p>
        </div>
        <Ftr />
      </div>
    </>
  );
}

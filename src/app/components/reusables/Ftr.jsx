"use client";
import instagram from "../../../../public/instagram (1).png";
import x from "../../../../public/twitter (1).png";
import facebook from "../../../../public/facebook.png";
import paypal from "../../../../public/icons/card.png";
import mastercard from "../../../../public/icons/shopping.png";
import klarna from "../../../../public/icons/symbol.png";
import visa from "../../../../public/icons/visa.png";
import amex from "../../../../public/icons/amex.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Ftr() {
  return (
    <>
      <div className="relative w-full min-h-[300px] grid grid-cols-5 mt-10 bg-secondary py-14 sm:text-center text-start">
        <div className="col-span-2 flex flex-col px-4 sm:px-28 py-2 sm:py-5 justify-center items-center ">
          <h3 className="font-semibold tracking-widest  sm:tracking-[1rem] text-base sm:text-xl">
            RETROVA
          </h3>
          <div className="w-full py-2 h-full bg-white my-4 flex flex-col justify-center items-center rounded-2xl shadow-2xl">
            <h2 className="w-full text-center pb-4 text-xs sm:text-sm tracking-normal font-semibold">
              ISCRIVITI ALLA NEWSLETTER
            </h2>
            <form className="flex justify-center sm:flex-row flex-col w-full items-center gap-4 sm:px-0 px-2">
              <input
                type="text"
                name=""
                id="mail"
                className="focus:outline-none border-2 border-secondary w-full sm:w-[40%] p-1 rounded-lg text-center"
                placeholder="Inserisci qui la tua mail"
              />
              <button className=" py-2 px-2 sm:px-4 bg-secondary/70 rounded-lg text-[0.65rem] sm:text-sm font-semibold">
                ISCRIVITI
              </button>
            </form>
          </div>
        </div>
        <div className="col-span-1 text-xs sm:text-base sm:text-start text-center flex flex-col px-22 py-5">
          <h2 className="font-semibold tracking-wider">INFO</h2>
          <div className="py-4 flex flex-col sm:gap-7 gap-4 underline underline-offset-[2px]">
            <Link href="/info/faqs">FAQs</Link>
            <Link href="/info/terms">Terms</Link>
            <Link href="/info/paymentOptions">Payment options</Link>
            <Link href="/info/contacts">Contact Us</Link>
          </div>
        </div>
        <div className="col-span-1 text-xs sm:text-base sm:text-start text-center  flex flex-col px-22 py-5">
          <h2 className="font-semibold tracking-wider">POLICY</h2>
          <div className="py-4 flex flex-col sm:gap-7 gap-4 underline underline-offset-[2px]">
            <Link href="/info/withdrawal">Withdrawal policy</Link>
            <Link href="/info/warranty">Legal warranty</Link>
            <Link href="/info/shipping&duties">Shipping&Duties</Link>
            <Link href="/info/privacy">Privacy policy</Link>
          </div>
        </div>
        <div className="col-span-1 text-xs sm:text-base sm:text-start text-center  flex flex-col px-22 py-5">
          <h2 className="font-semibold tracking-wider">DATA</h2>
          <div className="py-4 flex flex-col sm:gap-7 gap-4 underline underline-offset-[2px]">
            <Link href="/info/faqs">Cookies</Link>
            <Link href="/info/terms">Data protection</Link>
            <Link href="/info/contacts">Terms of sale</Link>
          </div>
        </div>
        <div className="absolute text-sm sm:text-base  bottom-0 left-0 w-fit flex justify-center items-center p-2 gap-4">
          <Image src={x} alt="x" width={20} height={20} />
          <Image src={instagram} alt="instagram" width={20} height={20} />
          <Image src={facebook} alt="facebook" width={20} height={20} />
        </div>
        <div className=" sm:text-base text-[0.60rem] absolute bottom-0 left-0 w-full flex justify-center items-center pt-2">
          <p>© 2024 Copyright: Retrova.it</p>
        </div>
        <div className="absolute top-0 left-0 w-full flex justify-end items-center pt-2 pr-5 gap-5">
          <div className="overflow-hidden object-cover flex justify-center items-center h-[20px]">
            <Image
              src={paypal}
              alt="paypal"
              width={35}
              height={35}
              className="bg-white"
            />
          </div>
          <Image src={mastercard} alt="paypal" width={35} height={35} />
          <Image src={klarna} alt="klarna" width={35} height={35} />
          <Image src={visa} alt="visa" width={35} height={35} />
          <Image src={amex} alt="amex" width={35} height={35} />
        </div>
        {/* <div className="border-r-[1px] border-white flex flex-col py-10 justify-between items-center">
          <div className=""></div>
          <div className="w-full">
            <h2 className="w-full text-end pr-10 text-lg font-semibold mb-4">
              ISCRIVITI ALLA NEWSLETTER
            </h2>
            <form className="flex justify-end w-full items-center gap-4 pr-10">
              <input
                type="text"
                name=""
                id="mail"
                className="focus:outline-none my-4 border-2 border-secondary w-[40%] p-1 rounded-lg text-center"
                placeholder="Inserisci qui la tua mail"
              />
              <button className=" py-2 px-4 bg-secondary/70 rounded-lg text-sm font-semibold">
                ISCRIVITI
              </button>
            </form>
          </div>
        </div>
        <ul className="grid grid-cols-3 py-8 justify-center items-center text-center text-sm font-semibold underline underline-offset-2 text-slate-600">
          <Link href={"/faqs"} className="cursor-pointer">
            FAQs
          </Link>
          <Link href={"/contacts"} className="cursor-pointer">
            Contact Us
          </Link>
          <Link href={"/terms"} className="cursor-pointer">
            Terms
          </Link>
          <div className="cursor-pointer">Link 4</div>
          <div className="cursor-pointer">Link 5</div>
          <div className="cursor-pointer">Link 6</div>
          <div className="cursor-pointer">Link 7</div>
          <div className="cursor-pointer">Link 9</div>
          <div className="cursor-pointer">Link 10</div>
          <div className="cursor-pointer">Link 11</div>
          <div className="cursor-pointer">Link 12</div>
          <div className="cursor-pointer">Link 13</div>
        </ul>
        <div className="absolute bottom-0 left-0 w-fit flex justify-center items-center p-2 gap-4">
          <Image src={x} alt="x" width={20} height={20} />
          <Image src={instagram} alt="instagram" width={20} height={20} />
          <Image src={facebook} alt="facebook" width={20} height={20} />
        </div> */}
      </div>
    </>
  );
}

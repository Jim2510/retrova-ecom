"use client";

import Navbar from "../components/reusables/Navbar";
import NavSocial from "../components/reusables/NavSocial";

export default function Login() {
  return (
    <>
      <div className="w-full h-screen">
        <NavSocial />
        <Navbar bgNav={"!bg-white"} />

        <div className="w-full h-full flex justify-center items-center pt-28 drop-shadow-2xl bg-white">
          <div className="w-[85%] h-full flex justify-center items-center bg-black">
            <div className="w-[45%] h-full  flex justify-center items-center border-2 border-black bg-white">
              <div className="w-[60%] h-[80%] border-2 border-black flex justify-center items-center flex-col bg-black text-white">
                <h2 className="text-4xl font-semibold py-10">LOGIN</h2>
                <form className="w-[90%] h-full border-2 border-black mb-10 flex-col  flex justify-start items-center">
                  <div className="flex w-full pt-8 px-2 items-center gap-4">
                    <input
                      type="text"
                      className="border-2 border-black w-full h-12 text-xl px-2 text-black"
                    />
                    <label htmlFor="username" className=" font-bold">
                      USERNAME
                    </label>
                  </div>
                  <div className="flex w-full py-8 px-2 items-center gap-4">
                    <input
                      type="password"
                      className="border-2 border-black w-full h-12 text-xl px-2 text-black"
                    />
                    <label htmlFor="username" className=" font-bold">
                      PASSWORD
                    </label>
                  </div>
                  <button className="px-4 text-xl border-2 border-white">
                    LOGIN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

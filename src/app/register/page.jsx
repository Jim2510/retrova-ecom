"use client";

import { useState } from "react";
import { storefront } from "../../../utilis";
import Navbar from "../components/reusables/Navbar";
import NavSocial from "../components/reusables/NavSocial";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    });
    const data = response.json();

    if (response.ok) {
      console.log("User registered", data);
      setRegistrationComplete(true);
    } else {
      console.error("Registration failed", data);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <NavSocial />
        <Navbar bgNav={"!bg-white"} />

        <div className="relative w-full h-full flex justify-center items-center pt-28 drop-shadow-2xl bg-white">
          {registrationComplete ? (
            <div className="absolute top-36 bg-green-400 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-md">
              <p className="text-black text-center">
                Registration successful! You can now log in.
              </p>
            </div>
          ) : null}
          <div className="w-[85%] h-full flex justify-center items-center bg-black">
            <div className="w-[45%] h-full  flex justify-center items-center border-2 border-black bg-white">
              <div className="w-[60%] h-[80%] border-black flex justify-center items-center flex-col bg-black backdrop-blur-3xl text-white">
                <h2 className="text-4xl font-semibold py-10">REGISTER</h2>
                <form
                  className="w-[90%] h-full border-2 border-black mb-10 flex-col flex justify-start items-center"
                  onSubmit={registerUser} // Gestisci l'invio del form
                >
                  <div className="flex w-full pt-8 px-2 items-center gap-4">
                    <input
                      type="text"
                      className="border-2 border-black w-full h-12 text-xl px-2 text-black"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)} // Aggiorna lo stato
                    />
                  </div>
                  <div className="flex w-full py-4 px-2 items-center gap-4">
                    <input
                      type="text"
                      className="border-2 border-black w-full h-12 text-xl px-2 text-black"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)} // Aggiorna lo stato
                    />
                  </div>
                  <div className="flex w-full py-4 px-2 items-center gap-4">
                    <input
                      type="email"
                      className="border-2 border-black w-full h-12 text-xl px-2 text-black"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Aggiorna lo stato
                    />
                  </div>
                  <div className="flex w-full py-8 px-2 items-center gap-4">
                    <input
                      type="password"
                      className="border-2 border-black w-full h-12 text-xl px-2 text-black"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Aggiorna lo stato
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 text-xl border-2 border-white"
                  >
                    REGISTER
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

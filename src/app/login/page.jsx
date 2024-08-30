"use client";

import { useState } from "react";
import Navbar from "../components/reusables/Navbar";
import NavSocial from "../components/reusables/NavSocial";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const loginUser = async (e) => {
    e.preventDefault();

    console.log("Email:", email); // Debug: Verifica se l'email è corretta
    console.log("Password:", password); // Debug: Verifica se la password è corretta

    const response = await fetch("/api/auth/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log("Response object:", response); // Debug: Verifica l'oggetto risposta

    const data = await response.json();
    console.log("Response data:", data); // Debug: Verifica i dati ricevuti dall'API

    if (response.ok) {
      console.log("Dispatching login action...");
      Cookies.set("accessToken", data.accessToken, {
        expires: 7, // Numero di giorni prima della scadenza del cookie
        secure: true, // Assicura che il cookie sia trasmesso solo su connessioni HTTPS
        sameSite: "Strict", // Impedisce l'invio del cookie con richieste cross-site
      });

      Cookies.set("user", JSON.stringify({ email }), {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      dispatch(
        login({
          accessToken: data.accessToken,
          expiresAt: data.expiresAt,
          user: { email },
        })
      );
      router.push("/");
      console.log("User logged in:", data); // Debug: Conferma che l'utente è stato loggato
    } else {
      console.error("Login failed:", data); // Debug: Verifica se ci sono errori
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <NavSocial />
        {/* <Navbar bgNav={"!bg-white"} /> */}

        <div className="w-full h-full flex justify-center items-center pt-10 drop-shadow-2xl bg-white">
          <div className="w-[85%] h-full flex justify-center items-center bg-white shadow-inner-2xl">
            <div className="w-full sm:w-[45%] h-full flex justify-center items-center bg-white shadow-2xl">
              <div className="w-full sm:w-[60%] h-full sm:h-[80%] flex justify-center rounded-xl items-center flex-col shadow-2xl backdrop-blur-3xl text-black">
                <h2 className="text-4xl font-semibold py-10 tracking-[1rem]">
                  LOGIN
                </h2>
                <form
                  className="w-[90%] h-full  mb-10 flex-col flex justify-start items-center"
                  onSubmit={loginUser}
                >
                  <div className="grid grid-cols-4 w-full pt-8 px-2 items-center gap-4">
                    <input
                      type="email"
                      className="border-2 border-black w-full h-12 text-xl px-2 text-black col-span-3"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="email"
                      className="font-bold  sm:text-base text-xs col-span-1"
                    >
                      EMAIL
                    </label>
                  </div>
                  <div className="w-full py-8 px-2 items-center gap-4 grid grid-cols-4">
                    <input
                      type="password"
                      className="border-2 border-black w-full h-12 text-xl px-2 text-black col-span-3"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="font-bold sm:text-base text-xs col-span-1"
                    >
                      PASSWORD
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1 sm:text-xl bg-white text-black font-bold border-2 border-white rounded-full text-base"
                  >
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

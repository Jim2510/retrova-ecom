"use client";

import { useState } from "react";
import Navbar from "../components/reusables/Navbar";
import NavSocial from "../components/reusables/NavSocial";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";
import { Provider } from "react-redux";
import { store } from "../../../store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginUser = async (e) => {
    e.preventDefault(); // Previene il refresh della pagina

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
    console.log(response);

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      dispatch(
        login({
          accessToken: data.accessToken,
          email: data.email,
        })
      );
      console.log("User logged in:", data);
      // Puoi salvare il token e reindirizzare l'utente, o mostrare un messaggio di successo
    } else {
      console.error("Login failed:", data);
      // Mostra un messaggio di errore all'utente
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <NavSocial />
        <Navbar bgNav={"!bg-white"} />

        <div className="w-full h-full flex justify-center items-center pt-28 drop-shadow-2xl bg-white">
          <div className="w-[85%] h-full flex justify-center items-center bg-black">
            <div className="w-[45%] h-full flex justify-center items-center border-2 border-black bg-white">
              <div className="w-[60%] h-[80%] border-black flex justify-center items-center flex-col bg-black backdrop-blur-3xl text-white">
                <h2 className="text-4xl font-semibold py-10">LOGIN</h2>
                <form
                  className="w-[90%] h-full border-2 border-black mb-10 flex-col flex justify-start items-center"
                  onSubmit={loginUser}
                >
                  <div className="flex w-full pt-8 px-2 items-center gap-4">
                    <input
                      type="email"
                      className="border-2 border-black w-full h-12 text-xl px-2 text-black"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email" className="font-bold">
                      EMAIL
                    </label>
                  </div>
                  <div className="flex w-full py-8 px-2 items-center gap-4">
                    <input
                      type="password"
                      className="border-2 border-black w-full h-12 text-xl px-2 text-black"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password" className="font-bold">
                      PASSWORD
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="px-4 text-xl border-2 border-white"
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

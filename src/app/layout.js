"use client";

// import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../../store";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Provider>
  );
}

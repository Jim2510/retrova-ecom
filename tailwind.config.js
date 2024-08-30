/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "inner-2xl":
          "inset 0 25px 50px rgba(0, 0, 0, 0.3), inset 0 -5px 10px rgba(0, 0, 0, 0.2)",
      },
      fontFamily: {
        "ibm-plex-serif": ['"IBM Plex Serif"', "serif"],
      },
      colors: {
        primary: "#468189",
        secondary: "#ecebe4",
        tertiary: "#ecebe4",
        nav: "#000",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        bleft: "url('/Aggiungi_un_titolo_1000_x_600_px_1920_x_1920_px.png')",
        bright: "url('/Aggiungi_un_titolo_1000_x_600_px_1920_x_1920_px_1.png')",
        b1: "url('/images/1.png')",
        b2: "url('/images/2.png')",
        b3: "url('/images/3.png')",
        b4: "url('/images/4.png')",
        b1r: "url('/images/1r.png')",
        b2r: "url('/images/2r.png')",
        b3r: "url('/images/3r.png')",
        b4r: "url('/images/4r.png')",
        rings: "url('/images/rings.png')",
        necklaces: "url('/images/necklaces.png')",
        bracelets: "url('/images/bracelets.png')",
        earrings: "url('/images/earrings.png')",
      },
    },
  },
  plugins: [],
};

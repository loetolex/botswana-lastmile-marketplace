/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: { xl2: "1.5rem" },
      boxShadow: { soft: "0 12px 40px rgba(15,23,42,.08)" }
    }
  },
  plugins: []
};

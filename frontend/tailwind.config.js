/** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{js,jsx}"],
   darkMode: "class",
   theme: {
      extend: {
         colors: {
            primaryLight: "#F2FCFC",
            secondaryLight: "#BDF1F6",
            acccentLight: "#0245A3",
            textPrimary: "#635985",
            darkmode: "#18122B",
            darkmodeSecondary: "#2A2438",
            darkmodeAccent: "#001F3F",
         },
      },
   },
   plugins: [],
};

module.exports = {
  config: {
    plugins: [require("@tailwindcss/typography")],
  },
  darkmode: "class",
  plugin: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f3',
          100: '#ffeae6',
          200: '#ffcdc1',
          300: '#ff9a83',
          400: '#ff6745',
          500: '#F86041',  // nowy kolor dla primary-500
          600: '#e1503a',
          700: '#c73d30',
          800: '#ad2925',
          900: '#94111b',
        },
        sunsetOrange: {
          100: "#FFE3DE",
          200: "#FFB8AF",
          300: "#FF8C80",
          400: "#FF604F",
          500: "#F86041",
          600: "#C54834", 
          700: "#933128",
          800: "#611B1B", 
          900: "#300E0F",
        },
        aquaBlue: {
          100: "#D3F3F4",
          200: "#A6E6E8",
          300: "#79D9DC",
          400: "#4CCCD0",
          500: "#33A9AC",
          600: "#288687",
          700: "#1E6363",
          800: "#143E3F",
          900: "#0A1A1B",
        },
        deepMagenta: {
          100: "#F3D4E1",
          200: "#E7A9C3",
          300: "#DB7EA5",
          400: "#CF5387",
          500: "#982062",
          600: "#79194E",
          700: "#5A123A",
          800: "#3B0C26",
          900: "#1D0613",
        },
        midnightBlue: {
          100: "#D7D7E9",
          200: "#AFAFD3",
          300: "#8888BD",
          400: "#6060A7",
          500: "#343779",
          600: "#2A2C61",
          700: "#1F2149",
          800: "#151631",
          900: "#0A0B18",
        },
        goldenAmber: {
          100: "#FFF1DB",
          200: "#FFE1B2",
          300: "#FFD18A",
          400: "#FFC162",
          500: "#FFA646",
          600: "#CC8337",
          700: "#995F29",
          800: "#663B1B",
          900: "#33180E",
        },
        coolGray: {
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },        
      },
      screens: {
        xs: "480px",
        xxs: "320px",
      },
    },
  },
};

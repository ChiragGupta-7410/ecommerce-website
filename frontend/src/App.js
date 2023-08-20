import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/headerComponents/Header.js";
import Home from "./components/homeComponents/Home.js";
import Footer from "./components/footerComponents/Footer.js";
import SingleProduct from "./components/productComponents/SingleProduct.js";

function App() {
  const theme = {
    colors: {
      heading: "#272829",
      text: "#2B2730",
      white: "#fff",
      black: "#222831",
      grey: "#526D82",
      bg: "#E3FDFD",
      header_bg: "#CBF1F5",
      header_shadow: "#CBF1F5e7",
      footer_bg: "#71C9CE",
      btn: "#08D9D6",
      border: "#08D9D680",
      hover: "#A6E3E9",
      gradient: "linear-gradient(0deg, #71C9CE 0%, #A6E3E9 100%)",
      shadow: "0 0 1rem #00000099",
      shadowSupport: " #00000029 0px 1px 4px",
      palette: {
        first: "#E3FDFD",
        second: "#CBF1F5",
        third: "#A6E3E9",
        fourth: "#71C9CE",
        fifth: "#99DBF5",
      },
    },
    screen: {
      mobile: "780px",
      tablet: "970px",
      small_desktop: "1080px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/products/:id" Component={SingleProduct} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;

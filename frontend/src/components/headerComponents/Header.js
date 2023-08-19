import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle, MdSearch, MdAddShoppingCart } from "react-icons/md";
import styled from "styled-components";
import logo from "D:/Web D/Web Development/ecommerce-website/frontend/src/media/images/Logo.png";

const options = {
  burgerColorHover: "#A6E3E9",
  logo,
  logoWidth: "20vw",
  navColor1: "#ffffff",
  navColor2: "#E3FDFD",
  navColor3: "#CBF1F5",
  navColor4: "#A6E3E9",
  logoHoverSize: "10px",
  logoHoverColor: "#71C9CE",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "2vmax",
  link2Size: "1.5vmax",
  link3Size: "1.5vmax",
  link4Size: "1.5vmax",
  link1Family: '"Lato", sans-serif',
  link2Family: '"Lato", sans-serif',
  link3Family: '"Lato", sans-serif',
  link4Family: '"Lato", sans-serif',
  link1Color: "#2B2730",
  nav1justifyContent: "space-evenly",
  nav2justifyContent: "space-evenly",
  nav3justifyContent: "space-evenly",
  nav4justifyContent: "space-evenly",
  link1ColorHover: "#71C9CE",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColorHover: "#71C9CE",
  searchIconColorHover: "#71C9CE",
  cartIconColorHover: "#71C9CE",
  cartIconMargin: "1.5vmax",
  profileIcon: true,
  profileIconColor: "#2B2730",
  ProfileIconElement: MdAccountCircle,
  searchIcon: true,
  searchIconColor: "#2B2730",
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: "#2B2730",
  CartIconElement: MdAddShoppingCart,
};

const Header = () => {
  return (
    <StyledHeader>
      <ReactNavbar {...options} />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.header_bg};
  box-shadow: 0 3px 15px ${({ theme }) => theme.colors.header_bg};
  height: 6vmax;
  position: fixed;
  width: 100%;
  z-index: 999;

  .linksReactNavbar {
    font-family: "Lato", sans-serif;
  }

  .menuBurger {
    height: 2vmax;
    top: 1vmax;
    width: 2.5vmax;
  }

  @media screen and (max-width: 800px) {
    .logoReactNavbar {
      width: 20vw !important;
    }
  }
`;

export default Header;

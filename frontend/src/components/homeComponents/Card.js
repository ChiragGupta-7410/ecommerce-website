import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import styled from "styled-components";

const Card = ({ product }) => {
  const options = {
    edit: false,
    color: "#526D82",
    activeColor: "#222831",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Wrapper>
      <Link className="productCard" to={`/products/${product._id}`}>
        <img src="https://i.ibb.co/DRST11n/1.webp" alt={product.name} />
        <p>{product.name}</p>
        <div>
          <ReactStars {...options} />
          <span className="productCardSpan">
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .productCard {
    width: 14vmax;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.palette.third};
    color: ${({ theme }) => theme.colors.black};
    margin: 2vmax;
    padding-bottom: 0.5vmax;
    border-radius: 0 10px;

    img {
      width: 14vmax;
      border-radius: 0 10px;
    }

    div {
      margin: 0.5vmax;
      justify-content: center;
      align-items: center;
    }
  }

  .productCardSpan {
    margin: 0.5vmax;
  }

  .productCard > p {
    font-size: 1.2vmax;
    margin: 1vmax 0.5vmax;
    margin-bottom: 0;
  }

  .productCard > span {
    margin: 0.5vmax;
    color: ${({ theme }) => theme.colors.black};
    font-size: 1vmax;
  }

  .productCard:hover {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.grey};
    transform: translateY(-1vmax);
    transition: 0.5s;
  }

  @media screen and (max-width: ${({ theme }) => theme.screen.mobile}) {
    .productCard > p {
      font-size: 1.7vmax;
    }

    .productCard > div {
      margin: 0vmax;
      display: block;
    }

    .productCard > span {
      font-size: 1.5vmax;
    }

    .productCard > div > span {
      margin: 0 0.5vmax;
    }
  }
`;

export default Card;

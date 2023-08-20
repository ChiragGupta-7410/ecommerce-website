import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Card from "./Card.js";
import MetaData from "../metaComponents/MetaData.js";
import {
  clearErrors,
  getAllProducts,
} from "../../redux/actions/ProductActions.js";
import Loader from "../loaderComponents/Loader.js";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getAllProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Laptop Shop - Your One-Stop Laptop Universe" />
          <Wrapper className="homepage">
            <div className="cover_page">
              <div className="introduction">
                <p className="intro-data">Welcome to </p>
                <h1>Laptop Shop</h1>
                <h2>Your One-Stop Laptop Universe</h2>
                <p>
                  Find the perfect laptop, elevate your setup with cutting-edge
                  accessories, and join our tech tribe. Dive into the future of
                  tech shopping now!
                </p>
                <a href="#featured">
                  <button>
                    <AiOutlineShoppingCart /> Shop Now
                  </button>
                </a>
              </div>
            </div>
            <div id="featured">
              <div className="featured">
                <h2>Featured Products</h2>

                <div className="products">
                  {products &&
                    products.map((product) => (
                      <Card key={product._id} product={product} />
                    ))}
                </div>
              </div>
            </div>
          </Wrapper>
        </Fragment>
      )}
    </Fragment>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  min-height: 100vh;
  padding: 6vmax 0 16rem;

  > div {
    margin: auto;
    padding: 5rem 8rem 0;
  }

  .cover_page {
    height: 100vh;
    text-align: center;

    .introduction {
      max-width: 60vw;
      height: 100%;
      padding: 0 5rem;
      margin: auto;

      p {
        font-size: 1.5rem;
        margin: 0 auto 1rem;
        color: ${({ theme }) => theme.colors.palette.fourth};
      }

      .intro-data {
        font-size: 2.5rem;
        color: ${({ theme }) => theme.colors.grey};
      }

      h1 {
        font-size: 3.5rem;
        color: ${({ theme }) => theme.colors.heading};
      }

      h2 {
        font-size: 3rem;
      }

      a {
        button {
          border: none;
          box-shadow: ${({ theme }) => theme.colors.shadowSupport};
          font-weight: 900;
          font-size: 1.2rem;
          width: 10rem;
          height: 3rem;
          background-color: ${({ theme }) => theme.colors.grey};
          color: ${({ theme }) => theme.colors.white};
          transition: all 0.1s ease-in;
          text-align: center;

          &:hover,
          &:focus {
            background-color: ${({ theme }) => theme.colors.grey + "CC"};
          }
        }
      }
    }
  }

  #featured {
    background-color: ${({ theme }) => theme.colors.palette.fifth};
    .featured {
      padding-bottom: 5rem;
      text-align: center;
      z-index: 10;
      min-height: 100vh;
      margin-top: 1rem;

      h2 {
        font-size: 2rem;
        padding-top: 50px;
        color: ${({ theme }) => theme.colors.grey};
        width: 30vmax;
        border-bottom: solid 1px ${({ theme }) => theme.colors.grey};
        margin: auto;
      }

      .products {
        display: flex;
        margin: 2vmax auto;
        width: 80vw;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 100%;
        background-color: ${({ theme }) => theme.colors.palette.second};
        box-shadow: ${({ theme }) => theme.colors.shadowSupport};
      }
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.screen.mobile}) {
    > div {
      margin: auto;
      padding: 5rem 0 0;
    }

    .cover_page {
      .introduction {
        p {
          font-size: 1.5rem;
        }

        .intro-data {
          font-size: 1.5rem;
        }

        h1 {
          font-size: 2.5rem;
        }

        h2 {
          font-size: 2rem;
        }

        a {
          button {
            margin-top: 1rem;
          }
        }
      }
    }
  }
`;

export default Home;

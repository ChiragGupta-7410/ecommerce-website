import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct } from "../../redux/actions/ProductActions";
import { useParams } from "react-router";
import Loader from "../loaderComponents/Loader";
import MetaData from "./../metaComponents/MetaData";
import { useAlert } from "react-alert";

const SingleProduct = () => {
  const alert = useAlert;
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, product } = useSelector(
    (state) => state.singleProduct
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getSingleProduct(id));
  }, [dispatch, id, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name}`} />
          <Wrapper>
            <div className="product-details">
              <div className="image-box">
                {product.images && (
                  <img
                    className="product-image"
                    key={product.images.id}
                    src={product.images.url}
                    alt={`${product.name}`}
                  />
                )}
              </div>

              <div className="detail-box">
                <div className="product-name">
                  <h2>{product.name}</h2>
                  <p>#{product._id}</p>
                </div>
                <div className="product-rating">
                  ⭐⭐⭐⭐⭐{/* <Rating {...options} /> */}
                  <br />
                  <span className="review-span">
                    {" "}
                    ({product.numReviews} Reviews)
                  </span>
                </div>
                <hr />
                <div className="product-price">
                  <h1>
                    <sup>₹</sup>
                    {`${product.price}`}
                  </h1>
                  <p>Exclusive of all taxes</p>
                </div>
                <hr />
                <div className="container">
                  <div className="product-quantity">
                    <button>-</button>
                    <input readOnly type="number" value={5} />
                    <button>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    // onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>

                  <p>
                    Status:
                    <b className={product.stock < 1 ? "red" : "green"}>
                      {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div className="product-about">
              <div className="product-description">
                Description : <hr />
                <p>{product.description}</p>
                <hr />
              </div>
              <button
                //   onClick={submitReviewToggle}
                className="submit-review"
              >
                Submit Review
              </button>
            </div>

            <h3 className="product-reviews">REVIEWS</h3>

            {/* <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog> */}

            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {/* {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))} */}
              </div>
            ) : (
              <p className="num-reviews">No Reviews Yet</p>
            )}
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

  .product-details {
    display: flex;
    gap: 2.5rem;
    justify-content: space-evenly;
    padding-bottom: 2rem;
    .image-box {
      height: 100%;
      .product-image {
        box-shadow: ${({ theme }) => theme.colors.shadow};
        object-fit: fill;
        width: 25rem;
      }
    }

    .detail-box {
      width: 30rem;
      min-width: 16rem;
      display: block;
      background-color: ${({ theme }) => theme.colors.palette.fifth};
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
      padding: 2rem;

      .product-name {
        h2 {
          color: ${({ theme }) => theme.colors.black};
          font-size: 2.5rem;
          margin: 0;
        }
        p {
          color: ${({ theme }) => theme.colors.white};
          font-size: 0.75rem;
          margin-top: 0;
          transition: all 0.5s ease-in-out;
          &:hover {
            transform: scale(1.1) translateX(1rem);
          }
        }
      }

      .product-rating {
        color: ${({ theme }) => theme.colors.grey};
      }

      hr {
        border: 1px solid ${({ theme }) => theme.colors.white};
        background-color: ${({ theme }) => theme.colors.white};
      }

      .product-price {
        h1 {
          color: ${({ theme }) => theme.colors.black};
          margin-bottom: 10px;
          sup {
            font-size: 1rem;
          }
        }
        p {
          color: ${({ theme }) => theme.colors.grey};
          font-size: 1rem;
          margin-top: 0;
          margin-bottom: 2rem;
        }
      }

      .container {
        padding: 2rem 0;

        .product-quantity {
          button {
            height: 30px;
            background-color: ${({ theme }) => theme.colors.black};
            color: ${({ theme }) => theme.colors.white};
            border: none;

            &:first-child {
              border-radius: 10px 0 0 10px;
            }

            &:last-child {
              border-radius: 0 10px 10px 0;
            }

            &:hover,
            &:active,
            &:focus {
              background-color: ${({ theme }) => theme.colors.grey};
              transform: scale3d(1.1, 1.1, 1.1);
            }
          }
          input {
            height: 30px;
            border: none;
            background-color: ${({ theme }) => theme.colors.white};
            color: ${({ theme }) => theme.colors.black};
            text-align: center;
          }
        }

        > button {
          margin-top: 1rem;
          height: 30px;
          width: 30%;
          border: none;
          border-radius: 40px;
          background-color: ${({ theme }) => theme.colors.btn};
          box-shadow: ${({ theme }) => theme.colors.shadowSupport};
          color: ${({ theme }) => theme.colors.grey};
          transition: all 0.5s ease-out;

          &:hover,
          &:active,
          &:focus {
            background-color: ${({ theme }) => theme.colors.hover};
            box-shadow: ${({ theme }) => theme.colors.shadow};
            transform: scale3d(1.1, 1.1, 1.1);
          }
        }

        > p {
          color: ${({ theme }) => theme.colors.grey};

          b {
            margin-left: 1rem;
          }

          .green {
            color: green;
          }

          .red {
            color: red;
          }
        }
      }
    }
  }

  .product-about {
    background-color: ${({ theme }) => theme.colors.palette.fifth};
    padding-bottom: 2rem;

    .product-description {
      padding: 0 4rem 4rem;
      font-size: 2rem;
      color: ${({ theme }) => theme.colors.black};

      hr {
        width: 30vw;
        border: none;
        border-top: 1px solid ${({ theme }) => theme.colors.white};
        display: table-caption;
      }

      p {
        font-size: 1.25rem;
        color: ${({ theme }) => theme.colors.grey};
        border: none;
      }
    }

    .submit-review {
      margin-left: 4rem;
      padding: 1rem;
      margin-top: 1rem;
      font-size: 1.5rem;
      width: 30%;
      border: none;
      border-radius: 40px;
      background-color: ${({ theme }) => theme.colors.btn};
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
      color: ${({ theme }) => theme.colors.grey};
      transition: all 0.5s ease-out;

      &:hover,
      &:active,
      &:focus {
        background-color: ${({ theme }) => theme.colors.hover};
        box-shadow: ${({ theme }) => theme.colors.shadow};
        transform: scale3d(1.05, 1.05, 1.05);
      }
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.screen.mobile}) {
    text-align: center;
    > div {
      margin: auto;
      padding: 5rem 0 0;
    }

    .product-details {
      display: block;
      .image-box {
        .product-image {
          display: block;
          margin: auto;
          width: 70vw;
        }
        margin-bottom: 1rem;
      }

      .detail-box {
        width: 70vw;
        min-width: 0;
        margin: auto;

        .product-name {
          p {
            &:hover,
            &:focus {
              transform: scale(1.1);
            }
          }
        }
      }
    }

    .product-about {
      .product-description {
        padding: 0 3rem 4rem;

        hr {
          display: block;
        }
      }

      .submit-review {
        margin-left: 0;
        width: initial;
      }
    }
  }
`;

export default SingleProduct;

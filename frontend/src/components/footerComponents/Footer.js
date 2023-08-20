import React from "react";
import styled from "styled-components";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
  return (
    <StyledFooter>
      <div className="footer-subscribe">
        <h2>Subscribe to get important updates!</h2>
        <form action="https://formspree.io/f/mzblrbll" method="POST">
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            autoComplete="on"
          />

          <input type="submit" value="Subscribe" />
        </form>
      </div>
      <div className="container">
        <div className="footer-about">
          <h2>Laptop Shop</h2>
          <p>Your One-Stop Laptop Universe</p>
        </div>
        <div className="footer-social">
          <h2>Follow Us</h2>
          <div className="footer-social-icons">
            <div>
              <BiLogoGmail className="icons" />
            </div>
            <div>
              <FaLinkedin className="icons" />
            </div>
            <div>
              <a
                href="https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithubSquare className="icons" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-contact">
          <h2>Call Us</h2>
          <h3>+91 12345678978</h3>
        </div>
      </div>

      <div className="footer-bottom-section">
        <div>
          <p>Conditions of Use</p>
          <p>Privacy Notice</p>
          <p>Interest-Based Ads</p>
        </div>
        <p>
          © {new Date().getFullYear()}, Chirag Gupta
          <br /> All Rights Reserved
        </p>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.footer_bg};

  .footer-subscribe {
    max-width: 60vw;
    margin: auto;
    padding: 5rem 8rem;
    background-color: ${({ theme }) => theme.colors.header_bg};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(-50%);
    display: flex;
    justify-content: space-around;

    h2 {
      font-size: 2rem;
    }

    form {
      width: 60%;
      input {
        display: block;
        height: 40%;
        margin: 5% auto 5%;
        border-radius: 40px;
        border: none;
        box-shadow: ${({ theme }) => theme.colors.shadowSupport};
        font-weight: 900;
        font-size: 1.2rem;
        &:first-child {
          width: 90%;
          transition: all 0.1s ease-in;
          padding: 0 0 0 5%;
          &::placeholder {
            padding-left: 10%;
            color: ${({ theme }) => theme.colors.grey};
          }

          &:focus,
          &:active {
            &::placeholder {
              color: ${({ theme }) => theme.colors.grey + "CC"};
            }
          }
        }

        &:nth-child(2) {
          width: 50%;
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
  .container {
    padding: 0 4vw;
    display: flex;
    gap: 4.5rem;
    justify-content: center;
    width: 90%;
    margin: auto;
    transform: translateY(-50%);

    .footer-about {
      width: 25%;
      p {
        color: ${({ theme }) => theme.colors.grey};
      }
    }

    .footer-social,
    .footer-contact {
      width: 15%;
    }

    .footer-social .footer-social-icons {
      width: 100%;
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      justify-content: start;

      .icons {
        width: 2rem;
        height: 2rem;
        color: ${({ theme }) => theme.colors.grey};
      }
    }

    .footer-contact {
      h3 {
        color: ${({ theme }) => theme.colors.grey};
      }
    }
  }

  .footer-bottom-section {
    text-align: center;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.white};
    div {
      margin: 0 auto;
      width: 80%;
      transform: translateY(-55%);
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    > p {
      margin-bottom: 0;
      padding-bottom: 40px;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.screen.small_desktop}) {
    .footer-subscribe {
      display: block;
      text-align: center;

      form {
        margin: auto;
        height: 10rem;
        width: 80%;
      }
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.screen.mobile}) {
    .footer-subscribe {
      max-width: 100vw;
      margin: 4.8rem 0;
      padding: 4rem;
      text-align: center;
    }

    .container {
      display: block;
      text-align: center;

      .footer-about,
      .footer-social,
      .footer-contact {
        width: 100%;
        padding: 2%;
      }

      .footer-social .footer-social-icons {
        justify-content: space-evenly;
        flex-wrap: wrap;
      }
    }
  }
`;

export default Footer;

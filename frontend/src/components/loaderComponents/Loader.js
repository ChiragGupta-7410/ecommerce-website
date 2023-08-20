import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledLoader className="loading">
      <div></div>
    </StyledLoader>
  );
};

const StyledLoader = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
  display: grid;
  place-items: center;
  max-width: 100%;

  div {
    position: relative;
    width: 5rem;
    height: 5rem;
    overflow: hidden;
    border-radius: 50%;
    animation: circleAnimation 1s linear infinite;

    &::before,
    &:after {
      content: "";
      position: absolute;
    }

    &::before {
      inset: 10px;
      background: ${({ theme }) => theme.colors.palette.fourth};
      border-radius: 50%;
      backdrop-filter: blur(10px);
      border: 1px solid ${({ theme }) => theme.colors.palette.third};
      z-index: 1;
    }

    &::after {
      top: -50%;
      left: -50%;
      width: 100%;
      height: 100%;
      background: ${({ theme }) => theme.colors.palette.second};
    }
  }

  @keyframes circleAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;

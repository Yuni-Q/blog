import React, { useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  width: 1000vw;
  height: 100vh;
  background: #fff000;
  display: flex;
`;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  &:nth-child(odd) {
    background: orange;
  }
  &:nth-child(even) {
    background: dodgerblue;
  }
`;

const Wheel: React.VFC = () => {
  const wrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let posX = 0;
    const maxX = -(wrapper.current.clientWidth - window.innerWidth);
    window.addEventListener('wheel', (e) => {
      console.log(e.deltaY);
      posX -= e.deltaY;
      if (posX > 0) {
        posX = 0;
      }
      if (posX < maxX) {
        posX = maxX;
      }
      wrapper.current.style.transform = `translateX(${posX}px)`;
    });
  });
  return (
    <>
      <GlobalStyle />
      <Wrapper ref={wrapper} className="container">
        {Array(10)
          .fill(1)
          .map((idx) => {
            return <Page key={idx} />;
          })}
      </Wrapper>
    </>
  );
};

export default Wheel;

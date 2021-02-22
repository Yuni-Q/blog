import React, { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  img {
    width: 100%;
    height: 100%;
  }
  .slider {
    overflow: hidden;
    position: relative;
    width: 992px;
    height: 768px;
  }
  .slides {
    width: 10000px;
    position: absolute;
    top: 0;
    left: -992px;
    &.transition {
      transition: all 0.3s ease-in-out;
    }
    cursor: pointer;
    display: flex;
  }
  .slide {
    width: 992px;
    height: 768px;
  }
  .prev,
  .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-size: 4rem;
  }
  .prev:active,
  .next:active {
    color: #888;
  }
  .prev {
    left: 4rem;
  }
  .next {
    right: 4rem;
  }
`;

const Draggable = () => {
  useEffect(() => {
    const slides = document.querySelector('.slides');
    const allSlides = document.querySelectorAll('.slide');
    const slidesLength = allSlides.length;
    const slideWidth = (allSlides[0] as HTMLDivElement).offsetWidth;

    let index = 0;
    let posX1 = 0;
    let posX2 = 0;
    let initialPosition;
    let finalPosition;
    let canISlide = true;

    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    const firstSlide = allSlides[0];
    const lastSlide = allSlides[allSlides.length - 1];

    const cloneFirstSlide = firstSlide.cloneNode(true);
    const clonelastSlide = lastSlide.cloneNode(true);

    const dragMove = (e) => {
      if (e.type === 'touchmove') {
        posX2 = posX1 - e.touches[0].clientX;
        posX2 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }

      (slides as HTMLDivElement).style.left = `${
        (slides as HTMLDivElement).offsetLeft - posX2
      }px`;
    };
    slides.addEventListener('touchmove', dragMove);
    const dragEnd = () => {
      finalPosition = (slides as HTMLDivElement).offsetLeft;
      if (finalPosition - initialPosition < -496) {
        switchSlide('next', 'dragging');
      } else if (finalPosition - initialPosition > 400) {
        switchSlide('prev', 'dragging');
      } else {
        (slides as HTMLDivElement).style.left = `${initialPosition}px`;
      }
      document.onmouseup = null;
      document.onmousemove = null;
    };
    slides.addEventListener('touchend', dragEnd);

    const dragStart = (e: any) => {
      e.preventDefault();
      initialPosition = (slides as HTMLDivElement).offsetLeft;

      if (e.type == 'touchstart') {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;

        document.onmouseup = dragEnd;
        document.onmousemove = dragMove;
      }
    };
    slides.addEventListener('mousedown', dragStart);
    slides.addEventListener('touchstart', dragStart);

    slides.appendChild(cloneFirstSlide);
    slides.insertBefore(clonelastSlide, firstSlide);

    const checkIndex = () => {
      slides.classList.remove('transition');
      if (index <= -1) {
        (slides as HTMLDivElement).style.left = `${-(
          slidesLength * slideWidth
        )}px`;
        index = slidesLength - 1;
      }
      if (index >= slidesLength) {
        (slides as HTMLDivElement).style.left = `${-(1 * slideWidth)}px`;
        index = 0;
      }
      canISlide = true;
    };

    slides.addEventListener('transitionend', checkIndex);

    const switchSlide = (arg: string, arg2?: string) => {
      slides.classList.add('transition');
      if (canISlide) {
        if (!arg2) {
          initialPosition = (slides as HTMLDivElement).offsetLeft;
        }
        if (arg === 'next') {
          (slides as HTMLDivElement).style.left = `${
            initialPosition - slideWidth
          }px`;
          index++;
        } else {
          (slides as HTMLDivElement).style.left = `${
            initialPosition + slideWidth
          }px`;
          index--;
        }
      }
      canISlide = false;
    };

    prev.addEventListener('click', () => switchSlide('prev'));
    next.addEventListener('click', () => switchSlide('next'));
  });
  return (
    <Wrapper>
      <div className="slider">
        <div className="slides">
          <div className="slide">
            <img
              src="https://i.pinimg.com/originals/7f/21/3f/7f213f8a3e039d2b66ab88a2ec2ccf87.png"
              alt=""
            />
          </div>
          <span className="slide">
            <img
              src="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTVfMTA1/MDAxNTcxMTQ0MjEzMzg3.AOysbEufWTaVwL4ePNbClBBlDKSvkm71V_1SxuNWNWMg.JlNebzXUQhtiznXUyztqicALU6M_d6YP9lvbfNDCWfgg.PNG.azzi_01/01.png?type=w800"
              alt=""
            />
          </span>
          <span className="slide">
            <img
              src="https://i.ytimg.com/vi/VVZrp1ooCYs/maxresdefault.jpg"
              alt=""
            />
          </span>
          <span className="slide">
            <img
              src="https://blog.kakaocdn.net/dn/LpVNO/btqBEBYnF30/AiHoDAkCKCT2XdeiRjCmB1/img.png"
              alt=""
            />
          </span>
        </div>
        <a href="#" className="prev">
          <i>&lt; </i>
        </a>
        <a href="#" className="next">
          <i>&gt; </i>
        </a>
      </div>
    </Wrapper>
  );
};

export default Draggable;

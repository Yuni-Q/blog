import { entries } from 'lodash';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const GlobalWidth = styled.div`
  max-width: 620px;
  margin: 0 auto;
  padding: 0 16px;
`;

const BoxContainer = styled.div`
  box-sizing: border-box;
  overflow-x: hidden;
  position: sticky; 
  top: 0;
  height: 100vh;
`;

const ImageBox = styled.div<{ image: string }>`
  will-change: opacity;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  background: url(${({ image }) => image}) no-repeat center / contain;
  opacity: 0;
  transition: 0.5s;
  &.visible {
    opacity: 1;
  }
`;

const ScrollText = styled.div`
  position: relative;
`

const Step = styled.div`
  margin: 0 16px 80vh;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background: rgba(255,255,255,0.8);
  box-shadow: rgba(0,0,0,0.3) 0 0 3px;
`;

const MoveBox = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  background: url('/favicon_black.ico') no-repeat center / contain;
  transform: translateX(100vw);
  transition: 1s 0.5s linear;
`;

const StepWrapper = styled.div`
  position: relative;
  padding-bottom: 1px;
`;

const Scroll = () => {
  useEffect(() => {
    setTimeout(() => scrollTo(0, 0), 100)
    const actions = {
      move(isTrue: boolean) {
        if (isTrue) {
          (document.querySelector('[data-index="4"] .move') as HTMLElement).style.transform = `translateX(-100%)`;
        } else {
          (document.querySelector('[data-index="4"] .move') as HTMLElement).style.transform = `translateX(100vw)`;
        }
      }
    }
    const steps = document.querySelectorAll('.step');
    const graphicItems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicItems[0];
    let ioIndex = 0

    const io = new IntersectionObserver((entries, observer) => {
      ioIndex = parseInt((entries[0].target as HTMLElement).dataset.index, 10);
    });

    const activate = (action) => {
      currentItem.classList.add('visible');
      if (action) {
        actions[action](true);
      }
    }
    const inactivate = (action) => {
      currentItem.classList.remove('visible')
      if (action) {
        actions[action](false);
      }

    }
    window.addEventListener('scroll', () => {
      for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
        const step = steps[i] as HTMLElement;
        if (!step) {
          continue;
        }
        io.observe(step)
        const boundingRect = step.getBoundingClientRect();
        if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
          inactivate((currentItem as HTMLElement).dataset.action);
          currentItem = (graphicItems[step.dataset.index]);
          activate((currentItem as HTMLElement).dataset.action);
        }
      }
    })
    activate((currentItem as HTMLElement).dataset.action);
  }, [])
  return (
    <GlobalWidth>
      <section>
        {Array(30).fill(1).map((_, idx) => {
          return <div>상단 내용</div>
        })}
      </section>
      <section >
        <BoxContainer>
          {Array(6).fill(1).map((_, idx) => {
            const image = idx % 2 ? '/favicon_black.ico' : '/favicon_blue.ico'
            if (idx === 4) {
              return <ImageBox key={`graphic-item-${idx}`} className="graphic-item" data-index={idx} data-action="move" image={image}>
                <MoveBox className="move" />
              </ImageBox>
            }
            return <ImageBox key={`graphic-item-${idx}`} className="graphic-item" data-index={idx} image={image} />
          })}
        </BoxContainer>
        <StepWrapper>
          {Array(6).fill(1).map((_, idx) => {
            return <Step key={`step-${idx}`} className="step" data-index={idx}>
              <ScrollText>중간 내용 {idx}</ScrollText>
            </Step>
          })}
        </StepWrapper>
      </section>
      <section>
        {Array(30).fill(1).map((_, idx) => {
          return <div>하단 내용</div>
        })}
      </section>
    </GlobalWidth>
  )
}

export default Scroll;

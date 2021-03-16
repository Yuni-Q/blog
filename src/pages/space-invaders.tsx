import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  width: 302px;
  height: 300px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 20px;
    height: 20px;
    &.invader {
      background-color: purple;
      border-radius: 10px;
    }
    &.shooter {
      background-color: green;
    }
    &.laser {
      background-color: orange;
    }
    &.boom {
      background-color: red;
    }
  }
`;

const SpaceInvaders = () => {
  const ref = useRef(null);

  useEffect(() => {
    const grid = ref.current as HTMLDivElement;
    const resultDisplay = document.querySelector('.results');
    let currentShooterIndex = 202;
    const width = 15;
    let direction = 1;
    let invadersId = null;
    let goingRight = true;
    const aliensRemoved = [];
    let results = 0;

    for (let i = 0; i < 255; i++) {
      const square = document.createElement('div');
      grid.appendChild(square);
    }

    const squares = Array.from(document.querySelectorAll('.grid div'));

    const alienInvaders = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
    ];

    const draw = () => {
      for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
          squares[alienInvaders[i]].classList.add('invader');
        }
      }
    };
    draw();

    const remove = () => {
      for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader');
      }
    };

    squares[currentShooterIndex].classList.add('shooter');

    const moveShooter = (e) => {
      squares[currentShooterIndex].classList.remove('shooter');
      switch (e.key) {
        case 'ArrowLeft':
          if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
          break;
        case 'ArrowRight':
          if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
          break;
      }
      squares[currentShooterIndex].classList.add('shooter');
    };
    document.addEventListener('keydown', moveShooter);

    const moveInvaders = () => {
      const leftEdge = alienInvaders[0] % width === 0;
      const rightEdge =
        alienInvaders[alienInvaders.length - 1] % width === width - 1;
      remove();

      if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += width + 1;
          direction = -1;
          goingRight = false;
        }
      }

      if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += width - 1;
          direction = 1;
          goingRight = true;
        }
      }

      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
      }

      draw();

      if (squares[currentShooterIndex].classList.contains('invader')) {
        console.log('game over');
        resultDisplay.innerHTML = 'GAVE OVER';
        clearInterval(invadersId);
      }

      for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > squares.length) {
          resultDisplay.innerHTML = 'GAVE OVER';
          clearInterval(invadersId);
        }
      }

      if (aliensRemoved.length == alienInvaders.length) {
        resultDisplay.innerHTML = 'You Win';
        clearInterval(invadersId);
      }
    };

    invadersId = setInterval(moveInvaders, 300);

    const shoot = (e) => {
      let laserId;
      let currentLaserIndex = currentShooterIndex;
      const moveLaser = () => {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        if (squares[currentLaserIndex].classList.contains('invader')) {
          squares[currentLaserIndex].classList.remove('laser');
          squares[currentLaserIndex].classList.remove('invader');
          squares[currentLaserIndex].classList.add('boom');

          setTimeout(
            () => squares[currentLaserIndex].classList.remove('boom'),
            300,
          );
          clearInterval(laserId);
          const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
          aliensRemoved.push(alienRemoved);
          results++;
          resultDisplay.innerHTML = results.toString();
        }
      };
      switch (e.key) {
        case 'ArrowUp':
          laserId = setInterval(moveLaser, 100);
      }
    };
    document.addEventListener('keydown', shoot);
  }, []);
  return (
    <>
      <h1 className="results"></h1>
      <Grid className="grid" ref={ref}></Grid>
    </>
  );
};

export default SpaceInvaders;
